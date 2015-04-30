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
                // todo something
                if(err) throw err;
                if(reply)
                    res.locals.authenticated = true;
                next();
            }
        );
    }
};
