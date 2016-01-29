var fs = require('fs');
var path = require('path');
var async = require('async');
var glob = require('glob');

module.exports = function (callback) {
  var pluginFiles = glob.sync(path.resolve(this.paths.plugins, '*'));

  var plugins = [];

  async.each(pluginFiles, function (file, callback) {
      plugins.push(require(file));
      callback(null);
  }, function (err) {
    return callback(null, plugins);
  });
};
