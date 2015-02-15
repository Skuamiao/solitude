var fs = require("fs"),
    express = require("express"),
    platform = require("platform"),
    yml = require("js-yaml"),
    solitude = express(),
    routers = [],
    cwd = process.cwd(),
    conf = yml.safeLoad(fs.readFileSync(cwd + "/conf.yml"));

// solitude.set("x-powered-by", false);

fs.readdir(cwd + conf.routes, function(err, routerFiles) {
    if(err) throw err;

    var routes = conf.routes;
    routerFiles.forEach(function(fileName) {
        routers.push(require(cwd + routes + "/" + fileName.split(".")[0]));
    });

    solitude.use(routers);
    solitude.listen(8000);
});
