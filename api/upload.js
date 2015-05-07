module.exports = function upload(api) {
    var multer = require("multer"),
        bf = require("buffer").Buffer;
    api.route("/upload").post(function(req, res, next) {
        if(res.locals.authenticated)
            next();
        else
            res.redirect("/");
    }, multer({
        dest: "./statics/upload/",
        onFileUploadStart: function(file, req, res) {
            // res.locals.bfArr = [];
        },
        onFileUploadData: function(file, data, req, res) {
            // res.locals.bfArr.push(data);
        },
        onFileUploadComplete: function(file, req, res) {
            // res.status(200).type(file.extension).send(
                                // bf.concat(res.locals.bfArr, file.size));
            // res.end("process with upload api!");

            res.status(200).type("html").render("pages/upload", {
                title: "上传文件",
                date: new Date(),
                msg: file.originalname + " 上传成功！"
            });

        }
    }));
};
