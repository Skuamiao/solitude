module.exports = function(manager) {
    manager.route("/").get(function(req, res) {
        // console.log(req.cookies, req.signedCookies);
        var local = {
                title: "管理",
                date: new Date(),
                user: ""
            };
        if(res.locals.authenticated)
            local.user = require("../utils/icrypto")
                                            .unescape(req.signedCookies["_@"]);

        res.status(200).type("html").render("manager-index", local);
    });
};
