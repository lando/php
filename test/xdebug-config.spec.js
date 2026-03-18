'use strict';

const chai = require('chai');
const expect = chai.expect;

const {normalizeXdebugConfig, generateXdebugIni} = require('../builders/php');

describe('normalizeXdebugConfig', () => {
  it('should normalize true to mode debug', () => {
    const result = normalizeXdebugConfig(true);
    expect(result.mode).to.equal('debug');
    expect(result.client_host).to.equal('host.lando.internal');
    expect(result.client_port).to.equal(9003);
  });

  it('should normalize false to mode off', () => {
    const result = normalizeXdebugConfig(false);
    expect(result.mode).to.equal('off');
  });

  it('should normalize undefined to mode off', () => {
    const result = normalizeXdebugConfig(undefined);
    expect(result.mode).to.equal('off');
  });

  it('should normalize null to mode off', () => {
    const result = normalizeXdebugConfig(null);
    expect(result.mode).to.equal('off');
  });

  it('should normalize a string to its mode', () => {
    const result = normalizeXdebugConfig('debug,develop');
    expect(result.mode).to.equal('debug,develop');
    expect(result.client_host).to.equal('host.lando.internal');
  });

  it('should pass through an object with defaults', () => {
    const result = normalizeXdebugConfig({mode: 'profile'});
    expect(result.mode).to.equal('profile');
    expect(result.start_with_request).to.equal('trigger');
    expect(result.client_port).to.equal(9003);
    expect(result.config).to.deep.equal({});
  });

  it('should resolve client_host auto to host.lando.internal', () => {
    const result = normalizeXdebugConfig({mode: 'debug', client_host: 'auto'});
    expect(result.client_host).to.equal('host.lando.internal');
  });

  it('should allow explicit client_host override', () => {
    const result = normalizeXdebugConfig({mode: 'debug', client_host: '192.168.1.100'});
    expect(result.client_host).to.equal('192.168.1.100');
  });

  it('should merge config pass-through', () => {
    const result = normalizeXdebugConfig({mode: 'debug', config: {max_nesting_level: 256}});
    expect(result.config).to.deep.equal({max_nesting_level: 256});
  });

  it('should apply all defaults for missing keys', () => {
    const result = normalizeXdebugConfig({mode: 'debug'});
    expect(result.start_with_request).to.equal('trigger');
    expect(result.client_host).to.equal('host.lando.internal');
    expect(result.client_port).to.equal(9003);
    expect(result.log).to.equal('/tmp/xdebug.log');
    expect(result.idekey).to.equal('');
  });
});

describe('generateXdebugIni', () => {
  it('should generate valid ini with all settings', () => {
    const config = {
      mode: 'debug',
      start_with_request: 'yes',
      client_host: 'host.lando.internal',
      client_port: 9003,
      log: '/tmp/xdebug.log',
      idekey: 'LANDO',
      config: {max_nesting_level: 256},
    };
    const ini = generateXdebugIni(config);
    expect(ini).to.contain('xdebug.mode = debug');
    expect(ini).to.contain('xdebug.start_with_request = yes');
    expect(ini).to.contain('xdebug.client_host = host.lando.internal');
    expect(ini).to.contain('xdebug.client_port = 9003');
    expect(ini).to.contain('xdebug.log = /tmp/xdebug.log');
    expect(ini).to.contain('xdebug.idekey = LANDO');
    expect(ini).to.contain('xdebug.max_nesting_level = 256');
  });

  it('should omit log when false', () => {
    const config = {
      mode: 'debug',
      start_with_request: 'trigger',
      client_host: 'host.lando.internal',
      client_port: 9003,
      log: false,
      idekey: '',
      config: {},
    };
    const ini = generateXdebugIni(config);
    expect(ini).to.not.contain('xdebug.log');
  });

  it('should omit idekey when empty', () => {
    const config = {
      mode: 'debug',
      start_with_request: 'trigger',
      client_host: 'host.lando.internal',
      client_port: 9003,
      log: '/tmp/xdebug.log',
      idekey: '',
      config: {},
    };
    const ini = generateXdebugIni(config);
    expect(ini).to.not.contain('xdebug.idekey');
  });
});
