var fs = require('fs');
var path = require('path');

var configLoader = require('./site/config-loader');
var loadTemplateSources = require('./site/load-template-sources');
var loadPlugins = require('./site/load-plugins');

var Site = function (options) {
  options = options || {};

  this.protocol = options.protocol || null;
  this.domain = options.domain || null;

  this.paths = {
    base: options.baseDir,
    assets: path.resolve(options.baseDir, 'assets'),
    config: path.resolve(options.baseDir, 'config'),
    plugins: path.resolve(options.baseDir, 'plugins'),
    templates: path.resolve(options.baseDir, 'templates')
  };
};

Site.prototype.getContentMaps = function (callback) {
  return configLoader.bind(this)('content.d', callback);
};

Site.prototype.getRouteMaps = function (callback) {
  return configLoader.bind(this)('routes.d', callback);
};

Site.prototype.getRewriteMaps = function (callback) {
  return configLoader.bind(this)('rewrites.d', callback);
};

Site.prototype.getTemplateSources = function (callback) {
  return loadTemplateSources.bind(this)(callback);
};

Site.prototype.getPlugins = function (callback) {
  return loadPlugins.bind(this)(callback);
};

module.exports = Site;
