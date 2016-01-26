var async = require('async');

module.exports = function (method, callback) {
  async.reduce(this.sites, {}, function (memo, item, callback) {
    item[method].call(item, function (err, result) {
      memo[item.domain] = result;
      return callback(err, memo);
    });
  }, callback);
};
