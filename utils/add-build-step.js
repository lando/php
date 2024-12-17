'use strict';

// Modules
const _ = require('lodash');

/**
 * Helper function to add build steps to a service's configuration
 *
 * @param {string|string[]} steps - The build step(s) to add
 * @param {Object} app - The Lando app object
 * @param {string} name - The name of the service
 * @param {string} [step='build_internal'] - The build step type to modify
 * @param {boolean} [front=false] - Whether to add steps to front of array
 * @return {void} - Modifies app config object directly
 *
 * @example
 * // Add a build step to the end
 * addBuildStep('npm install', app, 'web');
 *
 * @example
 * // Add multiple build steps to the front
 * addBuildStep(['composer install', 'npm install'], app, 'web', 'build_internal', true);
 */
module.exports = (steps, app, name, step = 'build_internal', front = false) => {
  const current = _.get(app, `config.services.${name}.${step}`, []);
  const add = (front) ? _.flatten([steps, current]) : _.flatten([current, steps]);
  _.set(app, `config.services.${name}.${step}`, _.uniq(add));
};
