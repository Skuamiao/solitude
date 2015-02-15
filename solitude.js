var fs = require("fs"),
    express = require("express"),
    platform = require("platform"),
    yml = require("js-yaml"),
    solitude = express(),
    routers = [],
    conf = yml.safeLoad(fs.readFileSync("conf.yml"));

// solitude.set("x-powered-by", false);

fs.readdir(conf.routes, function(err, routerFiles) {
    if(err) throw err;

    var routes = conf.routes;
    routerFiles.forEach(function(fileName) {
        routers.push(require(routes + "/" + fileName.split(".")[0]));
    });

    solitude.use(routers);
    solitude.listen(8000);
});
