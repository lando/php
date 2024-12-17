'use strict';

// Modules
const _ = require('lodash');

/**
 * Helper function to generate installation commands for dependencies
 *
 * @param {Object} deps - Dependencies object with package names as keys and versions as values
 * @param {Function} pkger - Function that generates package installation command
 * @param {string[]} [prefix=[]] - Command prefix to prepend to each installation command
 * @return {string[]} Array of formatted installation commands
 *
 * @example
 * // Generate npm install commands
 * const deps = { 'lodash': '^4.0.0', 'express': '4.17.1' };
 * const npmInstall = (pkg, version) => ['npm', 'install', `${pkg}@${version}`];
 * getInstallCommands(deps, npmInstall);
 * // Returns: ['npm install lodash@^4.0.0', 'npm install express@4.17.1']
 *
 * @example
 * // Generate commands with prefix
 * getInstallCommands(deps, npmInstall, ['sudo', '-E']);
 * // Returns: ['sudo -E npm install lodash@^4.0.0', 'sudo -E npm install express@4.17.1']
 */
module.exports = (deps, pkger, prefix = []) => _(deps)
  .map((version, pkg) => _.flatten([prefix, pkger(pkg, version)]))
  .map(command => command.join(' '))
  .value();
