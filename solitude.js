var fs = require("fs"),
    logger = require("./utils/logger"),
    router = require("./utils/router"),
    yml = require("js-yaml"),
    swig = require("swig"),
    solitude = require("express")(),
    // favicon = require("serve-favicon"),
    serveStatic = require("serve-static"),
    cwd = process.cwd(),
    confFileName = "conf.yml",
    confFilePath = cwd + "/" + "conf.yml";

require("./utils/cssman")();

fs.readFile(confFilePath, {encoding: "utf8"}, function (err, data) {
    if(err) throw err;

    var conf = yml.safeLoad(data, {
            filename: confFilePath
        });
    conf.cwd = cwd;

    // solitude.set("x-powered-by", false);

    // siwg template
    solitude.engine("swig", swig.renderFile);
    solitude.set("view engine", "swig");

    // serve static
    solitude.use("/styl", serveStatic("statics/styl", {index: false}));
    solitude.use("/script", serveStatic("statics/script", {index: false}));
    solitude.use("/img", serveStatic("statics/img", {index: false}));

    // favicon
    // solitude.use(favicon(cwd + "/favicon.png", {maxAge: "3s"}));

    // morgan in logger
    solitude.use(logger(conf));

    // routes
    solitude.use(router(conf));

    solitude.listen(8000);

});
