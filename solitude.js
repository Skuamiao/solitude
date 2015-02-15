var fs = require("fs"),
    express = require("express"),
    yml = require("js-yaml"),
    solitude = express(),
    cwd = process.cwd(),
    conf = yml.safeLoad(fs.readFileSync(cwd + "/conf.yml")),
    routesDir = cwd + conf.routesDir;

// solitude.set("x-powered-by", false);
fs.readdir(routesDir, function(err, routerFiles) {
    if(err) throw err;

    var routers = [],
        preDir = routesDir + "/";

    routerFiles.forEach(function(fileName) {
        routers.push(require(preDir + fileName.split(".")[0]));
    });

    solitude.use(routers);
    solitude.listen(8000);
});
