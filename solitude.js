var fs = require("fs"),
    yml = require("js-yaml"),
    logger = require("./utils/logger"),
    swig = require("swig"),
    router = require("./utils/router"),
    solitude = require("express")(),
    cwd = process.cwd(),
    conf = yml.safeLoad(fs.readFileSync(cwd + "/conf.yml"));

// solitude.set("x-powered-by", false);

// morgan in logger
solitude.use(logger(cwd, conf));

// siwg template
solitude.engine("swig", swig.renderFile);
solitude.set("view engine", "swig");

solitude.use(router(cwd, conf));

solitude.listen(8000);
