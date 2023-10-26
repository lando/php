'use strict';

// Modules
const _ = require('lodash');

/*
 * Helper to get global deps
 * @TODO: this looks pretty testable? should services have libs?
 */
module.exports = (deps, pkger, prefix = []) => _(deps)
  .map((version, pkg) => _.flatten([prefix, pkger(pkg, version)]))
  .map(command => command.join(' '))
  .value();
