module.exports = function manager(manager) {
    manager
    .route("/")
    .get(function(req, res) {
        var local = {
                title: "管理",
                date: new Date(),
                user: ""
            };
        if(res.locals.authenticated) 
            local.user = (new require("buffer").Buffer)(
                                            req.signedCookies["_@"], "base64"
                                        ).toString();
        
        res.status(200).type("html").render("pages/manager", local);
    });
};
