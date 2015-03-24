var fs = require("fs"),
    yml = require("js-yaml"),
    cwd = process.cwd(),
    confFilePath = cwd + "/conf.yml";

module.exports = function confman(fn) {
    fs.readFile(confFilePath, {encoding: "utf8"}, function (err, data) {
        if(err) throw err;
        var conf = yml.safeLoad(data, {
                filename: confFilePath
            });
        conf.cwd = cwd;
        if(fn) fn(conf);
    });
};
