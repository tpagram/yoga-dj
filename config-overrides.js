/* eslint-disable no-param-reassign */
/* config-overrides.js */

module.exports = function override(config, env) {
  // config.node = undefined;
  config.target = 'electron-renderer';
  return config;
};
