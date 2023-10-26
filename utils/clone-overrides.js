'use strict';

// Modules
const _ = require('lodash');

/*
 * Helper to get global deps
 * @TODO: this looks pretty testable? should services have libs?
 */
module.exports = (overrides = {}) => {
  const newOverrides = _.cloneDeep(overrides);
  if (_.has(newOverrides, 'image')) delete newOverrides.image;
  if (_.has(newOverrides, 'build')) delete newOverrides.build;
  return newOverrides;
};
