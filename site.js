var path = require('path');

var Site = function (options) {
  options = options || {};

  this.paths = {
    base: options.baseDir,
    config: path.resolve(options.baseDir, 'config'),
    plugins: path.resolve(options.baseDir, 'plugins'),
    templates: path.resolve(options.baseDir, 'templates')
  };

  this.protocol = options.protocol || null;
  this.domain = options.domain || null;
};

Site.prototype.loadTemplate = function () {

};

module.exports = Site;
