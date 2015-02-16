var fs = require("fs"),
    express = require("express"),
    yml = require("js-yaml"),
    logger = require("./utils/logger"),
    router = require("./utils/router"),
    solitude = express(),
    cwd = process.cwd(),
    conf = yml.safeLoad(fs.readFileSync(cwd + "/conf.yml"));

// solitude.set("x-powered-by", false);

// morgan in logger
solitude.use(logger(cwd, conf));
solitude.use(router(cwd, conf));

solitude.listen(8000);
