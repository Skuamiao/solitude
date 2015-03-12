var logger = require("./utils/logger"),
    router = require("./utils/router"),
    swig = require("swig"),
    solitude = require("express")(),
    // favicon = require("serve-favicon"),
    serveStatic = require("serve-static");

require("./utils/confman")(function(conf) {
    // require("./utils/cssman")(conf);

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
