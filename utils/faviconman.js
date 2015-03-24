var favicon = require("serve-favicon"),
    faviconman = function(app, conf) {
        console.log(conf.cwd + "/favicon.png");
        // app.use(favicon(conf.cwd + "/favicon.png", {maxAge: "3s"}));
    };

module.exports = faviconman;
