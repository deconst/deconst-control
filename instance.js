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
    throw new Error('Attempted to find nonexistent site ' + domain);
  }

  return site;
};

Instance.prototype.siteExists = function (domain) {
  var siteExists = true;
  
  try {
    findSiteByDomain.bind(this)(domain);
  } catch (e) {
    return false;
  }

  return siteExists;
};

Instance.prototype.getAssetsPath = function (domain) {
  if (findSiteByDomain.bind(this)(domain)) {
    return findSiteByDomain.bind(this)(domain).paths.assets;
  }

};

Instance.prototype.getTemplatesPath = function (domain) {
  if (findSiteByDomain.bind(this)(domain)) {
    return findSiteByDomain.bind(this)(domain).paths.templates;
  }

};

Instance.prototype.getPluginsPath = function (domain) {
  if (findSiteByDomain.bind(this)(domain)) {
    return findSiteByDomain.bind(this)(domain).paths.plugins;
  }
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
