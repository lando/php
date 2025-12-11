'use strict';

// Modules
const _ = require('lodash');
const path = require('path');
const semver = require('semver');
const addBuildStep = require('./../utils/add-build-step');

/**
 * Get the appropriate Composer version based on the PHP version.
 * @param {semver} phpSemver - The PHP semantic version.
 * @return {string|boolean} - The Composer version or false if we cannot parse the version.
 */
const getDefaultComposerVersion = phpSemver => {
  // Don't set a default composer version if we cannot
  // parse the version such as with `custom`.
  if (!phpSemver) return false;

  if (semver.lt(phpSemver, '5.3.2')) {
    // Use Composer 1 for PHP < 5.3.2
    return '1';
  } else if (semver.lt(phpSemver, '7.3.0')) {
    // Use Composer 2.2 LTS for PHP < 7.3
    return '2.2';
  } else {
    // Use Composer 2 for PHP >= 7.3
    return '2';
  }
};

/*
 * Helper to get nginx config
 */
const nginxConfig = options => ({
  app: options.app,
  config: _.merge({}, {
    vhosts: `${options.confDest}/${options.defaultFiles.vhosts}`,
  }, options.config),
  confDest: path.resolve(options.confDest, '..', 'nginx'),
  info: {managed: true},
  home: options.home,
  name: `${options.name}_nginx`,
  overrides: require('../utils/clone-overrides')(options.overrides),
  project: options.project,
  root: options.root,
  ssl: options.nginxSsl,
  type: options.nginxServiceType,
  userConfRoot: options.userConfRoot,
  webroot: options.webroot,
  version: options.via.split(':')[1],
});

const xdebugConfig = host => ([
  `client_host=${host}`,
  'discover_client_host=1',
  'log=/tmp/xdebug.log',
  'remote_enable=true',
  `remote_host=${host}`,
].join(' '));

const detectDatabaseClient = (options, debug = () => {}) => {
  if (options.db_client === false) return null;
  if (options.db_client && options.db_client !== 'auto') return options.db_client;

  const services = options._app?.config?.services || {};
  let mysqlVersion = null;
  let mariaVersion = null;

  for (const service of Object.values(services)) {
    const type = service?.type || '';
    // Match mysql:X, mysql:X.Y, or mysql:X.Y.Z formats
    const mysqlMatch = type.match(/^mysql:(\d+(?:\.\d+)?)/);
    if (mysqlMatch && !mysqlVersion) mysqlVersion = mysqlMatch[1];
    // Match mariadb:X, mariadb:X.Y, or mariadb:X.Y.Z formats
    const mariaMatch = type.match(/^mariadb:(\d+(?:\.\d+)?)/);
    if (mariaMatch && !mariaVersion) mariaVersion = mariaMatch[1];
  }

  if (mariaVersion && mysqlVersion) {
    debug('Both MariaDB (%s) and MySQL (%s) detected; using MariaDB. Set db_client to override.',
      mariaVersion, mysqlVersion);
  }

  if (mariaVersion) return `mariadb:${mariaVersion}`;
  if (mysqlVersion) return `mysql:${mysqlVersion}`;
  return null;
};

/**
 * Helper function to build a package string by combining package name and version
 *
 * @param {string} pkg - The package name
 * @param {string} version - The package version
 * @return {string} The formatted package string, either "pkg:version" or just "pkg" if version is empty
 *
 * @example
 * // Returns "php:7.4"
 * pkger('php', '7.4');
 *
 * @example
 * // Returns "mysql"
 * pkger('mysql', '');
 */
const pkger = (pkg, version) => (!_.isEmpty(version)) ? `${pkg}:${version}` : pkg;

/*
 * Helper to parse apache config
 */
const parseApache = options => {
  if (options.ssl) options.defaultFiles.vhosts = 'default-ssl.conf';
  options.volumes.push(`${options.confDest}/${options.defaultFiles.vhosts}:${options.remoteFiles.vhosts}`);
  if (options.version === '5.3') options.environment.APACHE_LOG_DIR = '/var/log';
  return options;
};

/*
 * Helper to parse cli config
 */
const parseCli = options => {
  options.command = [_.get(options, 'command', 'tail -f /dev/null')];
  return options;
};

/*
 * Helper to parse nginx config
 */
const parseNginx = options => {
  options.command = (process.platform !== 'win32') ? ['php-fpm'] : ['php-fpm -R'];
  options.phpServer = 'fpm';
  options.remoteFiles.vhosts = '/opt/bitnami/nginx/conf/lando.conf';
  options.defaultFiles.vhosts = (options.ssl) ? 'default-ssl.conf.tpl' : 'default.conf.tpl';
  options.nginxSsl = options.ssl;
  options.sslExpose = false;
  if (process.platform === 'win32') {
    options.volumes.push(`${options.confDest}/zz-lando.conf:/usr/local/etc/php-fpm.d/zz-lando.conf`);
  }
  options.remoteFiles.pool = '/usr/local/etc/php-fpm.d/zz-lando.conf';
  return options;
};

/*
 * Helper to parse php config
 */
const parseConfig = options => {
  switch (options.via.split(':')[0]) {
    case 'apache': return parseApache(options);
    case 'cli': return parseCli(options);
    case 'nginx': return parseNginx(options);
  }
};

// Builder
module.exports = {
  name: 'php',
  config: {
    version: '7.4',
    supported: ['8.5', '8.4', '8.3', '8.2', '8.1', '8.0', '7.4', '7.3', '7.2', '7.1', '7.0', '5.6', '5.5', '5.4', '5.3'],
    legacy: ['7.2', '7.1', '7.0', '5.6', '5.5', '5.4', '5.3'],
    gen2: ['5.5', '5.4', '5.3'],
    path: [
      '/app/vendor/bin',
      '/app/bin',
      '/usr/local/sbin',
      '/usr/local/bin',
      '/usr/sbin',
      '/usr/bin',
      '/sbin',
      '/bin',
      '/var/www/.composer/vendor/bin',
      '/helpers',
    ],
    confSrc: path.resolve(__dirname, '..', 'config'),
    command: ['sh -c \'a2enmod rewrite && apache2-foreground\''],
    composer_version: true,
    phpServer: 'apache',
    defaultFiles: {
      _php: 'php.ini',
      vhosts: 'default.conf',
      // server: @TODO? DO THE PEOPLE DEMAND IT?
    },
    environment: {
      COMPOSER_ALLOW_SUPERUSER: 1,
      COMPOSER_MEMORY_LIMIT: '-1',
      PHP_MEMORY_LIMIT: '1G',
    },
    remoteFiles: {
      _php: '/usr/local/etc/php/conf.d/xxx-lando-default.ini',
      vhosts: '/etc/apache2/sites-enabled/000-default.conf',
      php: '/usr/local/etc/php/conf.d/zzz-lando-my-custom.ini',
      pool: '/usr/local/etc/php-fpm.d/zz-lando.conf',
    },
    scriptsDir: path.resolve(__dirname, '..', 'scripts'),
    sources: [],
    suffix: '7',
    ssl: false,
    db_client: 'auto',
    via: 'apache',
    volumes: ['/usr/local/bin'],
    webroot: '.',
    nginxServiceType: 'php-nginx',
  },
  parent: '_appserver',
  builder: (parent, config) => class LandoPhp extends parent {
    constructor(id, options = {}, factory) {
      const debug = _.get(options, '_app._lando').log.debug;

      // Merge the user config onto the default options
      options = parseConfig(_.merge({}, config, options));

      // Get the semver of the PHP version, NULL if we cannot parse it
      const phpSemver = semver.coerce(options.version);
      phpSemver && debug('Parsed PHP semantic version: %s', phpSemver);

      // Mount our default php config
      options.volumes.push(`${options.confDest}/${options.defaultFiles._php}:${options.remoteFiles._php}`);
      options.volumes.push(`${options.confDest}/${options.defaultFiles.pool}:${options.remoteFiles.pool}`);
      // Shift on the docker entrypoint if this is a more recent version
      if (phpSemver && semver.gt(phpSemver, '5.5.0')) {
        options.command.unshift('docker-php-entrypoint');
      }

      // If xdebug is set to "true" then map it to "debug"
      if (options.xdebug === true) options.xdebug = 'debug';

      // for older generation models
      if (_.includes(options.gen2, options.version)) options.suffix = '2';

      // Build the php
      const php = {
        image: options.image ?? `devwithlando/php:${options.version}-${options.phpServer}-${options.suffix}`,
        environment: _.merge({}, options.environment, {
          PATH: options.path.join(':'),
          LANDO_WEBROOT: `/app/${options.webroot}`,
          XDEBUG_CONFIG: xdebugConfig(options._app.env.LANDO_HOST_IP),
          XDEBUG_MODE: (options.xdebug === false) ? 'off' : options.xdebug,
        }),
        networks: (_.startsWith(options.via, 'nginx')) ? {default: {aliases: ['fpm']}} : {default: {}},
        ports: (_.startsWith(options.via, 'apache') && options.version !== 'custom') ? ['80'] : [],
        volumes: options.volumes,
        command: options.command.join(' '),
      };
      options.info = {via: options.via};

      // Determine the appropriate composer version to install if not specified
      if (options.composer_version === true || options.composer_version === '') {
        options.composer_version = getDefaultComposerVersion(phpSemver);
      } else if (typeof options.composer_version === 'number') {
        options.composer_version = options.composer_version.toString();
      }

      // Add build step to enable xdebug
      if (options.xdebug) {
        addBuildStep(['docker-php-ext-enable xdebug'], options._app, options.name, 'build_as_root_internal');
      }

      // Add build step to install our Composer global packages
      if (!_.isEmpty(options.composer)) {
        const commands =
          require('../utils/get-install-commands')(options.composer, pkger, ['composer', 'global', 'require', '-n']);
        addBuildStep(commands, options._app, options.name, 'build_internal');
      }

      // Install the desired composer version as the first `build_internal` build step
      if (options.composer_version) {
        debug('Installing composer version %s', options.composer_version);
        const commands = [`/etc/lando/service/helpers/install-composer.sh ${options.composer_version}`];
        const firstStep = true;
        addBuildStep(commands, options._app, options.name, 'build_internal', firstStep);
      }

      const dbClient = detectDatabaseClient(options, debug);
      if (dbClient && phpSemver && semver.gte(phpSemver, '8.3.0')) {
        addBuildStep([`/etc/lando/service/helpers/install-db-client.sh ${dbClient}`], options._app, options.name, 'build_as_root_internal');
      }

      // Add in nginx if we need to
      if (_.startsWith(options.via, 'nginx')) {
        // Set another lando service we can pass down the stream
        const nginxOpts = nginxConfig(options);

        // Merge in any user specifified
        const PhpNginx = factory.get(nginxOpts.type);
        const data = new PhpNginx(nginxOpts.name, nginxOpts);
        // If the user has overriden this service lets make sure we include that as well
        const userOverrides = _.get(options, `_app.config.services.${nginxOpts.name}.overrides`, {});
        data.data.push({
          services: _.set({}, nginxOpts.name, userOverrides),
          version: _.get(data, 'data[0].version'),
        });
        // Add a depends_on to make sure nginx waits for php-fpm to be up.
        data.data.push({
          services: _.set({}, nginxOpts.name, {'depends_on': [options.name]}),
          version: _.get(data, 'data[0].version'),
        });
        // This is a trick to basically replicate what happens upstream
        options._app.add(data);
        options._app.info.push(data.info);
        // Indicate the relationship on the primary service
        options.info.served_by = nginxOpts.name;
      }

      // Add in the php service and push downstream
      options.sources.push({services: _.set({}, options.name, php)});
      super(id, options, ..._.flatten(options.sources));
    }
  },
};
