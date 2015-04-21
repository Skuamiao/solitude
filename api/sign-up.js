module.exports = function signUp(api) {
    var session = require("express-session"),
        RedisStore = require("connect-redis")(session),
        local = {
            title: "注册",
            date: new Date(),
            signInfo: null
        };
    
    // validation
    function validate(req, res, next) {
        var rt = require("./rules")(req.body);
        if(rt.succeeded) {
            res.locals.signInfo = rt;
            next();
        }else {
            local.signInfo = rt;
            res.status(200).type("html").render("pages/sign-up", local);
        }
    }
    
    // store
    function store2DB(req, res, next) {
        var data = res.locals.signInfo.data,
            pgn = require("pg-native"),
            cli = new pgn(),
            crypto = require("../utils/icrypto");
            
        cli.connect(function(err) {
            if(err)
                // todo something
                res.status(500).end("The Elephant is furious!"
                                        + " Maybe, it will be peaceful soon!");
            else
                cli.query(
                    "select set_author($1, $2, $3)",
                    [data.email, crypto.SHA1(data.pwd), data.name],
                    function(err, rows) {
                        var mark = 0;
                        // unset debug -> true
                        if(err)
                            // toto something
                            res.status(500).end("The Elephant is furious!"
                                        + " Maybe, it will be peaceful soon!");
                        else {
                            mark = rows[0]["set_author"];
                            // todo something
                            if(mark > 0)
                                // res.end("store ok");
                                next();
                            else if(mark < 0) // unset debug -> true
                                res.status(500).end("The Elephant is furious!"
                                        + " Maybe, it will be peaceful soon!");
                            else {
                                local.signInfo = {
                                    succeeded: 0,
                                    msg: "某些注册信息已存在，请更新后继续注册"
                                };
                                res.status(200).type("html")
                                                .render("pages/sign-up", local);
                            }
                        }
                        cli.end(function() {
                            console.log("connection ended!");
                        });
                    }
                );
        });
        
    }
    
    // set
    function set(req, res) {
        req.sessionStore.set(
            req.sessionID,
            req.session,
            function(err) {
                var buffer = require("buffer");
                if(err)
                    res.status(500).end("The red disappoints you!"
                                            + " Maybe, it will be fine soon!");
                else
                    res.cookie(
                        "_@",
                        (new buffer.Buffer(req.body.name || req.body.email))
                        .toString("base64"),
                        {httpOnly: true, signed: true}
                    ).redirect("/manager/");
            }
        );
    }
    
    api
    .route("/sign-up")
    .post(validate, store2DB, session({
        secret: "ciklid",
        resave: false,
        saveUninitialized: true,
        store: new RedisStore({
            host: "127.0.0.1",
            port: 6379,
            ttl: 1200
        }),
        name: "_-",
        genid: function(req) {
            var o = req.body,
                email = o.email.trim(),
                pwd = o.pwd.trim(),
                code = require("../utils/icrypto")
                        .SHA1(email.trim() + pwd.trim());
            return code;
        }
    }), set);
    
};
/*
function(req, res, next) {
    var rt = require("./rules")(req.body),
        crypto = require("../utils/icrypto"),
        pgn = require("pg-native"),
        cookieParser = require("cookie-parser"),
        client = null,
        arr = [];
    
    // res.status(200).end("end");
    console.log("second");
    
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
    
    // md5 279abc05812f41a14b51443c31414fa0
    //     38e59332e9be22065f955330e54fcbd6
    // console.log(crypto.SHA256("hello").toString());
    // console.log(crypto.SHA512("hello").toString());
    // console.log(crypto.SHA1("hello").toString());
}
*/
