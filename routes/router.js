module.exports = function(apps) {
    var nodes = require('./router.json'),
        keys = Object.keys(nodes);
    keys.forEach(function(key) {
        var routes = nodes[key],
            app = apps[key];
        routes.forEach(function(route) {
            require(route)(app);
        });
    });
};
