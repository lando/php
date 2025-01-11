'use strict';

const path = require('path');

/**
 * Get the app's config directory path
 * @param {Object} lando - The Lando instance
 * @param {Object} app - The application object
 * @return {string} The full path to the app's config directory
 * @throws {Error} If required parameters are missing
 */
module.exports = (lando, app) => {
  if (!lando?.config?.userConfRoot) throw new Error('Invalid Lando configuration');
  if (!app?.name || !app?.id) throw new Error('Invalid app configuration');

  return path.join(lando.config.userConfRoot, 'apps', `${app.name}-${app.id}`);
};
