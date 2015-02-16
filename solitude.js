var fs = require("fs"),
    express = require("express"),
    yml = require("js-yaml"),
    morgan = require("morgan"),
    solitude = express(),
    cwd = process.cwd(),
    conf = yml.safeLoad(fs.readFileSync(cwd + "/conf.yml")),
    routesDir = cwd + conf.routesDir;

// solitude.set("x-powered-by", false);
fs.readdir(routesDir, function(err, routerFiles) {
    if(err) throw err;

    var preDir = routesDir + "/",
        logsDir = cwd + conf.logsDir,
        logPath = logsDir + "/access.log",
        routers = [];

    fs.mkdir(logsDir, function(err) {
        if(err && err.code === "EEXIST") return;
        else throw err;
        
        fs.open(logPath, "a", function(err, fd) {fs.close(fd);});
    });
    solitude.use(morgan(
        ":remote-addr _ :remote-user _ :date[iso] _ :method _ :url _ :http-version _ :status _ :res[content-length] _ :response-time _ :referrer _ :user-agent",
        {
            stream: fs.createWriteStream(logPath, {flags: "a"})
        }
    ));

    routerFiles.forEach(function(fileName) {
        routers.push(require(preDir + fileName.split(".")[0]));
    });

    solitude.use(routers);
    solitude.listen(8000);
});
