var fs = require("fs"),
    router = function(cwd, conf) {
        var routesDir = cwd + conf.routesDir,
            preDir = routesDir + "/",
            routers = [];

        fs.readdirSync(routesDir).forEach(function(routeName) {
            routers.push(require(preDir + routeName.split(".")[0]));
        });

        return routers;
    };
module.exports = router;
