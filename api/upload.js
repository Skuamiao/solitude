module.exports = function upload(api) {
    var multer = require("multer");
    api.route("/upload").post(function(req, res, next) {
        if(res.locals.authenticated)
            next();
        else
            res.redirect("/");
    }, multer({
        dest: "./statics/upload/",
        onFileUploadComplete: function(file, req, res) {
            console.log(file);
            res.end("process with upload api!");
            /*
            res.status(200).type("html").render("pages/upload", {
                title: "上传文件",
                date: new Date()
            });
            */
        }
    }));
};
