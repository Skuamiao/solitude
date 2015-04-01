module.exports = function signUp(manager, sfs) {
    manager
    .route("/sign-up")
    .get(function(req, res) {
        
        sfs.get("my_secret", function(err, session) {
            console.log("===", err, session, "===");
        });

        sfs.set("my_secret", req.session, function(err, sess, a) {
            console.log("---", err, sess, a, "---");
        });
        
        res.status(200).type("html").render("sign-up", {
            title: "注册",
            date: new Date()
        });
    });
};
