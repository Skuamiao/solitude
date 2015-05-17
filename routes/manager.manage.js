/* 管理文章
 */
module.exports = function manage(manager) {
    manager.route("/manage").get(function(req, res) {
        if(res.locals.authenticated)
            res.status(200).type("html").render("pages/manage", {
                title: "管理文章",
                date: new Date(),
                user: require("../utils/icrypto")
                                            .unescape(req.signedCookies["_@"])
            });
        else
            res.redirect("/manager/");
    });
};
