module.exports = function signUp(manager) {
    manager
    .route("/sign-up")
    .get(function(req, res) {
        res.status(200).type("html").render("sign-up", {
            title: "注册",
            date: new Date()
        });
    });
};
