module.exports = function cssman(conf) {
    var fs = require("fs"),
        stylus = require("stylus"),
        dir = conf.cwd + conf.stylDir;

    fs.readdir(dir, function(err, files) {
        if(err) throw err;
        files.forEach(function(file) {
            if(file.indexOf(".styl") < 0) return;
            fs.readFile(
                dir + "/" + file,
                {encoding: "utf8"},
                function(err, data) {
                    if(err) throw err;
                    var filename = file.split(".")[0] + ".css";
                    stylus(data)
                        .set("indent spaces", 4)
                        .set("filename", filename)
                        .render(function(err, css) {
                            if(err) throw err;
                            fs.writeFile(
                                dir + "/" + filename,
                                css,
                                function(err) { if(err) throw err; }
                            );
                        });
                }
            );
        });
    });

}
