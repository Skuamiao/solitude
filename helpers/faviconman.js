// serve favicon
module.exports = function faviconman(solitude, conf) {
    console.log(conf.cwd + "/favicon.png");
    /*
    solitude.use(
        require("serve-favicon")(conf.cwd + "/favicon.png", {maxAge: "3s"})
    );
    */
};
