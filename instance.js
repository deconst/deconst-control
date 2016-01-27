var async = require('async');
var findSite = require('./instance/find-site');
var reduceSiteData = require('./instance/reduce-site-data');

var Instance = function (options) {
  options = options || {};
  this.sites = options.sites;
};

var findSiteByDomain = function (domain) {
  var site = findSite.bind(this)(function (site) {
    return site.domain == domain;
  });

  if(!site) {
    return '';
  }

  return site;
};

Instance.prototype.getAssetsPath = function (domain) {
  return findSiteByDomain.bind(this)(domain).paths.assets;
};

Instance.prototype.getTemplatesPath = function (domain) {
  return findSiteByDomain.bind(this)(domain).paths.templates;
};

Instance.prototype.getPluginsPath = function (domain) {
  return findSiteByDomain.bind(this)(domain).paths.plugins;
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
