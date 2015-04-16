module.exports = function signUp(api) {
    // validation
    function validate(req, res, next) {
        var rt = require("./rules")(req.body);
        if(rt.succeeded) {
            res.locals.signInfo = rt;
            next();
        }
        else 
            res.status(200).type("html").render("pages/sign-up", {
                title: "注册",
                date: new Date(),
                signInfo: rt
            });
    }
    
    // store
    function post2pg(req, res, next) {
        var data = res.locals.signInfo.data,
            pgn = require("pg-native"),
            cli = new pgn(),
            crypto = require("../utils/icrypto");
            
        cli.connect(function(err) {
            if(err) 
                // todo something
                res.status(500).end(
                    "The Elephant is furious!" + 
                    " Maybe, it will be peaceful soon!"
                );
            else 
                cli.query(
                    "select set_author($1, $2, $3)",
                    [data.email, crypto.SHA1(data.pwd), data.name], 
                    function(err, rows) {
                        var mark = 0;
                        // unset debug -> true
                        if(err) 
                            // toto something
                            res.status(500).end(
                                "The Elephant is furious!" + 
                                " Maybe, it will be peaceful soon!"
                            );
                        else {
                            mark = rows[0]["set_author"];
                            // todo something
                            if(mark > 0)
                                res.end("store ok");
                            else if(mark < 0) // unset debug -> true
                                res.status(500).end(
                                    "The Elephant is furious!" + 
                                    " Maybe, it will be peaceful soon!"
                                );
                            else
                                res.status(500).end("store not ok, re-sign");
                        }
                        cli.end(function() {
                            console.log("connection ended!");
                        });
                    }
                );
        });
        
    }
    
    api
    .route("/sign-up")
    .post(validate, post2pg, function(req, res, next) {
        var rt = require("./rules")(req.body),
            crypto = require("../utils/icrypto"),
            pgn = require("pg-native"),
            cookieParser = require("cookie-parser"),
            client = null,
            arr = [];
        
        // res.status(200).end("end");
        console.log("second");
        /*
        if(arr.length)
            res.status(200).end(arr.join(";\n") + "!");
        else {
            console.log("sess:" + crypto.SHA1(o.email + o.pwd).toString());
            req.sessionStore.set(
                crypto.SHA1(o.email + o.pwd).toString(), 
                req.session, 
                function(err, session) {
                    if(err) {
                        // todo
                        console.log(err);
                    }
                }
            );
            console.log(req.cookies, "org");
            console.log(cookieParser.signedCookie(req.cookies["_-"], "ciklid"));
            client = new pgn();
            client.connect(function(err) {
                if(err) {
                    // todo something
                    console.log(err);
                }else 
                    client.query(
                        "select set_author($1, $2, $3)",
                        [o.email, crypto.SHA1(o.pwd).toString(), o.name], 
                        function(err, rows) {
                            if(err) {
                                console.log(err);
                                // toto something
                                return;
                            }
                            // todo something
                            console.log(rows[0]);
                            client.end(function() {
                                console.log("connection ended!");
                            });
                        }
                    );
            });
            res.redirect("/manager/");
        }
        */
        // md5 279abc05812f41a14b51443c31414fa0
        //     38e59332e9be22065f955330e54fcbd6
        // console.log(crypto.SHA256("hello").toString());
        // console.log(crypto.SHA512("hello").toString());
        // console.log(crypto.SHA1("hello").toString());
    }, function(req, res, next) {
        console.log(4);
    }, function(req, res, next) {
        console.log(5);
    });
    
};
