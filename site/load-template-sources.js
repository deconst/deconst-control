var fs = require('fs');
var path = require('path');
var async = require('async');
var glob = require('glob');

module.exports = function (callback) {
  var templateDir = this.paths.templates;
  var templateFiles = glob.sync(path.resolve(templateDir, '**/*'), {nodir: true});

  var sources = {};

  async.each(templateFiles, function (file, callback) {
    fs.readFile(file, 'utf-8', function (err, contents) {
      sources[path.relative(templateDir, file)] = {
        src: contents,
        path: file
      };

      callback(null);
    });
  }, function (err) {
    return callback(null, sources);
  });
};
