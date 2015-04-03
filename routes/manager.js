module.exports = function manager(manager) {
    var cookieParser = require("cookie-parser");
    manager
    .route("/")
    .get(function(req, res) {
        var id = req.cookies["_-"];
        if(!id) {
            res.redirect("/manager/sign-up");
        }else {
            res.status(200).type("text").end("管理");
        }
    });
};
