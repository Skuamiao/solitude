var fs = require("fs"),
    stylus = require("stylus"),
    buildStyl = function(conf) {
        fs.readdir("statics/styl/", function(err, files) {
            if(err) throw err;
            files.forEach(function(ele) {
                if(ele.indexOf(".styl") < 0) return;
                fs.readFile(
                    "statics/styl/" + ele,
                    {encoding: "utf8"},
                    function(err, data) {
                        if(err) throw err;
                        stylus(data)
                            .set("indent spaces", 4)
                            .set("filename", ele.split(".")[0] + ".css")
                            .render(function(err, css) {
                                if(err) throw err;
                                fs.writeFile(
                                    "statics/styl/" + ele.split(".")[0] + ".css",
                                    css,
                                    function(err) { if(err) throw err; }
                                );
                            });
                    }
                );
            });
        });
    };
module.exports = buildStyl;
