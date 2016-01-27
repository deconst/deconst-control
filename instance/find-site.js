var findSite = function (iterator) {
  var result;

  this.sites.forEach(function (site) {
    if(iterator.apply(null, arguments)) {
      result = site;
    }
  });

  return result;
};


module.exports = findSite;
