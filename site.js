var fs = require('fs');
var path = require('path');
var async = require('async');
var glob = require('glob');

var Site = function (options) {
  options = options || {};

  this.protocol = options.protocol || null;
  this.domain = options.domain || null;

  this.paths = {
    base: options.baseDir,
    config: path.resolve(options.baseDir, 'config'),
    plugins: path.resolve(options.baseDir, 'plugins'),
    templates: path.resolve(options.baseDir, 'templates')
  };
};



Site.prototype.getContentMaps = function (callback) {
  return require('./site/config-loader').bind(this)('content.d', callback);
};

Site.prototype.getRouteMaps = function (callback) {
  return require('./site/config-loader').bind(this)('routes.d', callback);
};

Site.prototype.getRewriteMaps = function (callback) {
  return require('./site/config-loader').bind(this)('rewrites.d', callback);
};

module.exports = Site;
