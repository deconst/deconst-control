var async = require('async');
var findSite = require('./instance/find-site');
var reduceSiteData = require('./instance/reduce-site-data');

var Instance = function (options) {
  options = options || {};
  this.sites = options.sites;
};

Instance.prototype.getTemplatesPath = function (domain) {
  var site = findSite.bind(this)(function (site) {
    return site.domain == domain;
  });

  if(!site) {
    return '';
  }

  return site.paths.templates;
};

Instance.prototype.getPluginsPath = function (domain) {
  var site = findSite.bind(this)(function (site) {
    return site.domain == domain;
  });

  if(!site) {
    return null;
  }

  return site.paths.plugins;
};

Instance.prototype.getContentMaps = function (callback) {
  return reduceSiteData.bind(this)('getContentMaps', callback);
};

Instance.prototype.getRouteMaps = function (callback) {
  return reduceSiteData.bind(this)('getRouteMaps', callback);
};

Instance.prototype.getRewriteMaps = function (callback) {
  return reduceSiteData.bind(this)('getRewriteMaps', callback);
};

Instance.prototype.getTemplateSources = function (domain, callback) {
  var site = findSite.bind(this)(function (site) {
    return site.domain == domain;
  });

  if(!site) {
    return callback('Site not found', null);
  }

  return site.getTemplateSources(callback);
};


module.exports = Instance;
