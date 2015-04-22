module.exports = function signIn(api) {
    var session = require("express-session"),
        RedisStore = require("connect-redis")(session),
        local = {
            title: "登录",
            date: new Date(),
            signInfo: null
        };
    
    function validate(req, res, next) {
        var rt = require("./rules")(req.body);
        if(rt.succeeded) {
            res.locals.signInfo = rt;
            next();
        }else {
            local.signInfo = rt;
            res.status(200).type("html").render("pages/sign-in", local);
        }
    }
    
    function signed(req, res, next) {
        var data = res.locals.signInfo.data,
            icrypto = require("../utils/icrypto"),
            mark = icrypto.SHA1(data.email + data.pwd),
            cli = require("redis").createClient();
        if(mark === req.signedCookies["_-"])
            cli.get("sess:" + mark, function(err, reply) {
                    // unset debug -> true
                    if(err)
                        // todo something
                        res.status(500).end("The red disappoints you!"
                                            + " Maybe, it will be fine soon!");
                    else
                        // unset debug -> true
                        if(reply) {
                            local.signInfo = {
                                succeeded: 0,
                                msg: "该用户登录中"
                            };
                            res.status(200).type("html")
                                                .render("pages/sign-in", local);
                        }else
                            next();
                    cli.quit();
                }
            );
        else next();
    }
    
    function existed(req, res, next) {
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
                    "select existed_author($1)",
                    [crypto.SHA1(data.email) + crypto.SHA1(data.pwd)],
                    function(err, rows) {
                        var mark = 0;
                        // unset debug -> true
                        if(err)
                            // toto something
                            res.status(500).end("The Elephant is furious!"
                                        + " Maybe, it will be peaceful soon!");
                        else {
                            mark = rows[0]["existed_author"];
                            // todo something
                            if(mark > 0)
                                // res.end("existed");
                                next();
                            else {
                                local.signInfo = {
                                    succeeded: 0,
                                    msg: "邮箱或密码错误"
                                };
                                res.status(200).type("html")
                                                .render("pages/sign-in", local);
                            }
                        }
                        cli.end();
                    }
                );
        });
    }
    
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
                        {httpOnly: true, signed: true, path: "/"}
                    ).redirect("/manager/");
            }
        );
    }
    
    api.route("/sign-in").post(validate, signed, existed, session({
        secret: "ciklid",
        resave: false,
        saveUninitialized: true,
        rolling: true,
        store: new RedisStore({
            host: "127.0.0.1",
            port: 6379,
            ttl: 900
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