'use strict';

// Modules
const _ = require('lodash');

/*
 * Helper to get global deps
 * @TODO: this looks pretty testable? should services have libs?
 */
module.exports = (steps, app, name, step = 'build_internal', front = false) => {
  const current = _.get(app, `config.services.${name}.${step}`, []);
  const add = (front) ? _.flatten([steps, current]) : _.flatten([current, steps]);
  _.set(app, `config.services.${name}.${step}`, _.uniq(add));
};
