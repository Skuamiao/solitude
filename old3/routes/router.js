module.exports = function(apps) {
  var nodes = require('./routes');
  Object.keys(nodes).forEach(function(key) {
      var routes = nodes[key],
          app = apps[key];
      routes.forEach(function(route) {
          require(route)(app);
      });
  });
};
