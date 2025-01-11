'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Removes all PHP service directories for an app
 *
 * @param {Object} app - The Lando app instance
 * @param {Object} lando - The Lando instance
 * @return {Promise<void>} Promise that resolves when directories are removed
 * @throws {Error} If unable to get services directory
 */
module.exports = async (app, lando) => {
  try {
    const appConfDir = require('../utils/get-appconf-dir')(lando, app);
    app.log.debug('removing php service directories...');
    // Get all subdirectories starting with 'service-php-' and remove them
    if (fs.existsSync(appConfDir)) {
      fs.readdirSync(appConfDir)
        .filter(dir => dir.startsWith('service-php-'))
        .forEach(dir => {
          const phpServiceDir = path.join(appConfDir, dir);
          lando.utils.remove(phpServiceDir);
        });
    }
  } catch {}
};
