var async = require('async');

var Instance = function (options) {
  options = options || {};
  this.sites = options.sites;
};

Instance.prototype.getContentMaps = function (callback) {
  return require('./instance/reduce-site-data').bind(this)('getContentMaps', callback);
};

Instance.prototype.getRouteMaps = function (callback) {
  return require('./instance/reduce-site-data').bind(this)('getRouteMaps', callback);
};

Instance.prototype.getRewriteMaps = function (callback) {
  return require('./instance/reduce-site-data').bind(this)('getRewriteMaps', callback);
};


module.exports = Instance;
