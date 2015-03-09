var fs = require("fs"),
    logger = require("./utils/logger"),
    router = require("./utils/router"),
    yml = require("js-yaml"),
    swig = require("swig"),
    solitude = require("express")(),
    cwd = process.cwd(),
    confFileName = "conf.yml",
    confFilePath = cwd + "/" + "conf.yml";

fs.readFile(confFilePath, {encoding: "utf8"}, function (err, data) {
    if(err) throw err;

    var conf = yml.safeLoad(data, {
            filename: confFilePath
        }),
        year = (new Date()).getFullYear();

    conf.cwd = cwd;

    // solitude.set("x-powered-by", false);

    // siwg template
    solitude.engine("swig", swig.renderFile);
    solitude.set("view engine", "swig");

    // morgan in logger
    solitude.use(logger(conf));

    solitude.use(router(conf));

    solitude.listen(8000);

});
