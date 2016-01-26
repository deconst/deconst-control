var fs = require('fs');
var path = require('path');
var async = require('async');
var glob = require('glob');
var merge = require('merge');

var configLoader = function (directory, callback) {
  var files = glob.sync(path.resolve(this.paths.config, directory, '**/*'));

  async.reduce(files, {}, function (previousValue, currentValue, reduceCallback) {
    fs.readFile(currentValue, {encoding: 'utf-8'}, function (err, body) {
      if (err) {
        if (err.code === 'ENOENT') {
          return callback(null, {});
        }

        return callback(err);
      }

      var jsonDocument;
      try {
        jsonDocument = JSON.parse(body);
      } catch (e) {
        jsonDocument = {};
      }

      for (var prop in jsonDocument) {
        if (jsonDocument.hasOwnProperty(prop)) {
          if (previousValue.hasOwnProperty(prop)) {
            previousValue[prop] = merge(previousValue[prop], jsonDocument[prop]);
          } else {
            previousValue[prop] = jsonDocument[prop];
          }
        }
      }

      reduceCallback(null, previousValue);
    });
  }, callback);
};

module.exports = configLoader;
