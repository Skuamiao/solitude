module.exports = function signIp(manager) {
    manager.route("/sign-in").get(function(req, res) {
        res.status(200).type("html").render("manager-sign-in", {
            title: "登录",
            date: new Date()
        });
    });
};
