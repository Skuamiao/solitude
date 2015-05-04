/* 添加文章
 */
module.exports = function addArticle(manager) {
    manager.route("/add-article").get(function(req, res) {
        if(res.locals.authenticated)
            res.status(200).type("html").render("pages/add-article", {
                title: "管理文章",
                date: new Date(),
                user: require("../utils/icrypto")
                                            .unescape(req.signedCookies["_@"])
            });
        else
            res.redirect("/manager/");

    });
};
