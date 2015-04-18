module.exports = function manager(manager) {
    manager
    .route("/")
    .get(function(req, res) {
        var sc = req.signedCookies["_-"],
            user = req.signedCookies["_@"],
            redis = require("redis"),
            cli = redis.createClient(),
            buffer = require("buffer");
        
        cli.get(
            "sess:" + sc, 
            function(err, reply) {
                // unset debug -> true
                if(err) 
                    // todo something
                    res.status(500).end(
                        "The red disappoints you!" + 
                        " Maybe, it will be fine soon!"
                    );
                else 
                    // unset debug -> true
                    if(reply) 
                        res
                        .status(200)
                        .type("html")
                        .render("pages/manager", {
                            title: "管理",
                            date: new Date(),
                            user: user 
                                ? new buffer.Buffer(user, "base64").toString()
                                : ""
                        });
                    else 
                        res.redirect("/manager/sign-up");
                
                cli.quit();
            }
        );
        
    });
};
