var fs = require("fs"),
    router = function(cwd, conf) {
        var routesDir = cwd + conf.routesDir,
            preDir = routesDir + "/",
            routers = [],
            nothing = "nothing.js";

        fs.readdirSync(routesDir).forEach(function(routeName) {
            if(routeName === nothing)
                nothing = preDir + routeName.split(".")[0];
            else
                routers.push(require(preDir + routeName.split(".")[0]));
        });
        routers.push(require(nothing));

        return routers;
    };
module.exports = router;
