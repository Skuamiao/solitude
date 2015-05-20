/* 上传文件
 */
module.exports = function upload(manager) {
    manager.route("/upload").get(function(req, res) {
        if(res.locals.authenticated)
            res.status(200).type("html").render("manager-upload", {
                title: "上传文件",
                date: new Date(),
                user: require("../utils/icrypto")
                                            .unescape(req.signedCookies["_@"])
            });
        else
            res.redirect("/manager/");
        /*
        res.status(200).type("html").render("pages/sign-up", {
            title: "注册",
            date: new Date()
        });
        */
    });
};
