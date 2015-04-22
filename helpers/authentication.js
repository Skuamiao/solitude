module.exports = function authentication(req, res, next) {
    var sc = req.signedCookies["_-"],
        cli = null;
    
    if(!sc)
        next();
    else {
        cli = require("redis").createClient();
        cli.get(
            "sess:" + sc,
            function(err, reply) {
                // unset debug -> true
                if(err)
                    // todo something
                    res.status(500).end("The red disappoints you!"
                                        + " Maybe, it will be fine soon!");
                else {
                    // unset debug -> true
                    if(reply)
                        res.locals.authenticated = true;
                    next();
                }
                cli.quit();
            }
        );
    }
};