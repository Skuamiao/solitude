var signUp = function(solitude) {
    solitude
    .route("/sign-up")
    .get(function(req, res) {
        res.status(200).type("html").render("sign-up", {
            title: "注册",
            date: new Date()
        });
    });
};
module.exports = signUp;
