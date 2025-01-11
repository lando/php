/**
 * Event hooks for the PHP plugin
 *
 * @param {Object} app - The Lando app instance
 * @param {Object} lando - The Lando instance
 * @return {void}
 */
module.exports = (app, lando) => {
  // Remove the service config directory on appdestroy
  app.events.on('post-destroy', async () => {
    return await require('./hooks/app-purge-service-dirs')(app, lando);
  });
};
