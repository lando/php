'use strict';

// Modules
const _ = require('lodash');

/*
 * Helper to get global deps
 * @TODO: this looks pretty testable? should services have libs?
 */
exports.addBuildStep = (steps, app, name, step = 'build_internal', front = false) => {
  const current = _.get(app, `config.services.${name}.${step}`, []);
  const add = (front) ? _.flatten([steps, current]) : _.flatten([current, steps]);
  _.set(app, `config.services.${name}.${step}`, _.uniq(add));
};

/*
 * Helper to get global deps
 * @TODO: this looks pretty testable? should services have libs?
 */
exports.cloneOverrides = (overrides = {}) => {
  const newOverrides = _.cloneDeep(overrides);
  if (_.has(newOverrides, 'image')) delete newOverrides.image;
  if (_.has(newOverrides, 'build')) delete newOverrides.build;
  return newOverrides;
};

/*
 * Helper to get global deps
 * @TODO: this looks pretty testable? should services have libs?
 */
exports.getInstallCommands = (deps, pkger, prefix = []) => _(deps)
  .map((version, pkg) => _.flatten([prefix, pkger(pkg, version)]))
  .map(command => command.join(' '))
  .value();

/*
 * Run build
 */
exports.runBuild = (app, steps, lockfile, hash = 'YOU SHALL NOT PASS') => {
  if (!_.isEmpty(steps) && !app._lando.cache.get(lockfile)) {
    app.log.info('running build steps...');
    return app.engine.run(steps)
    // Save the new hash if everything works out ok
    .then(() => {
      app._lando.cache.set(lockfile, hash, {persist: true});
      app.log.info('build steps completed. and locked with %s', lockfile);
    })
    // Make sure we don't save a hash if our build fails
    .catch(error => {
      app.addWarning({
        title: `One of your build steps failed`,
        detail: [
          'This **MAY** prevent your app from working.',
          'Check for errors above, fix them in your Landofile, and try again by running:',
        ],
        command: 'lando rebuild',
      }, error);
    });
  }
};
