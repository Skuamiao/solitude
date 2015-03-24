var swig = require("swig"),
    tplman = function(app) {
        // siwg template
        app.engine("swig", swig.renderFile);
        app.set("view engine", "swig");
    };
module.exports = tplman;
