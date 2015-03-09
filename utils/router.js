var fs = require("fs"),
    router = function(conf) {
        var preDir = conf.cwd + conf.routesDir + "/",
            routers = [];

        fs.readdirSync(preDir).forEach(function(routeName) {
            if(routeName !== conf["404"])
                routers.push(require(preDir + routeName.split(".")[0]));
        });

        routers.push(require(preDir + conf["404"].split(".")[0]));

        return routers;
    };

module.exports = router;
