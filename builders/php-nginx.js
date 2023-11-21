'use strict';

const _ = require('lodash');
const LandoNginx = require('./../node_modules/@lando/nginx/builders/nginx.js');

// Builder
module.exports = {
  name: 'php-nginx',
  parent: '_webserver',
  builder: (parent, config) => class PhpNginx extends LandoNginx.builder(parent, LandoNginx.config) {
    constructor(id, options = {}) {
      super(id, options, {services: _.set({}, options.name)});
    };
  },
};
