module.exports = function signIn(api) {
    var drt = 86400e3 * 300,
        icrypto = require("../utils/icrypto"),
        session = require("express-session"),
        RedisStore = require("connect-redis")(session),
        ttl = 900,
        maxAge = null,
        local = {
            title: "登录",
            date: new Date(),
            signInfo: null
        },
        name = "",
        sc = "";
    
    function validate(req, res, next) {
        // console.log(req.body);
        var rt = require("./rules")(req.body);
        if(rt.succeeded) {
            res.locals.signInfo = rt;
            next();
        }else {
            local.signInfo = rt;
            res.status(200).type("html").render("pages/sign-in", local);
        }
    }
    
    function signIned(req, res, next) {
        var data = res.locals.signInfo.data,
            mark = icrypto.sha1(data.email + data.pwd),
            cli = require("redis").createClient();
        sc = req.signedCookies["_-"];
        // console.log(mark, req.signedCookies["_-"]);
        if(mark === sc)
            cli.get("sess:" + mark, function(err, reply) {
                    // unset debug -> true
                    if(err)
                        // todo something
                        throw err;
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
        else 
            next();
    }
    
    function existed(req, res, next) {
        var data = res.locals.signInfo.data,
            pgn = require("pg-native"),
            cli = new pgn();
        cli.connect(function(err) {
            if(err)
                // todo something
                throw err;
            else
                cli.query(
                    "select existed_author($1)",
                    [icrypto.sha1(data.email) + icrypto.sha1(data.pwd)],
                    function(err, rows) {
                        var mark = 0;
                        // unset debug -> true
                        if(err)
                            // toto something
                            throw err;
                        else {
                            mark = rows[0]["existed_author"];
                            // todo something
                            if(mark) { 
                                name = icrypto.escape(mark);
                                next();
                            }else {
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
    
    function setup(req, res) {
        if(req.body.dur) {
            ttl = 86400 * 14;
            maxAge = 86400e3 * 14;
            console.log(ttl, maxAge)
        }
        if(sc)
            req.session.regenerate(function(err) {
                // todo something
                if(err) throw err;
                req.sessionStore.set(req.sessionID, req.session, function(err) {
                    if(err)
                        // todo something
                        throw err;
                    else 
                        res.cookie(
                            "_@",
                            name,
                            {maxAge: drt, httpOnly: true, 
                                        signed: true, path: "/"}
                        ).redirect("/manager/");
                });
            });
        else
            req.sessionStore.set(req.sessionID, req.session, function(err) {
                // todo something
                if(err) throw err;
                else 
                    res.cookie(
                        "_@",
                        name,
                        {maxAge: drt, httpOnly: true, 
                                    signed: true, path: "/"}
                    ).redirect("/manager/");
            });
        /*
        var cli = require("redis").createClient(),
            email = icrypto.escape(req.body.email.trim());
        
        cli.get(email, function (err, reply) {
            if(err)
                // todo something
                throw err;
            else
                if(reply) 
                    req.sessionStore.set(req.sessionID, req.session, 
                        function(err) {
                            if(err)
                                // todo something
                                throw err;
                            else
                                res.cookie(
                                    "_@",
                                    reply,
                                    {maxAge: drt, httpOnly: true, signed: true, 
                                                                    path: "/"}
                                ).redirect("/manager/");
                        }
                    );
                else 
                    cli.setex(email, 86400*2, name, function(err) {
                        if(err)
                            // todo something
                            throw err;
                        else 
                            req.sessionStore.set(req.sessionID, req.session,
                                function(err) {
                                    if(err)
                                        // todo something
                                        throw err;
                                    else 
                                        res.cookie(
                                            "_@",
                                            name,
                                            {maxAge: drt, httpOnly: true, 
                                                        signed: true, path: "/"}
                                        ).redirect("/manager/");
                                }
                            );
                        cli.quit();
                    });
            cli.quit();
        });
        */
        /*
        console.log("sess", req.session);
        console.log("sess id", req.sessionID);
        console.log("sess cookie", req.session.cookie);
        console.log("sess cookie maxage", req.session.cookie.maxAge);
        setTimeout(function() {
            console.log("st sess cookie maxage", req.session.cookie.maxAge);
            req.session.regenerate(function(err) {
                if(err) throw err;
                    console.log("st r sess", req.session);
                    console.log("st r sess id", req.sessionID);
                    console.log("st r sess cookie", req.session.cookie);
                    console.log("st r sess cookie maxage", 
                                                    req.session.cookie.maxAge);
            });
        }, 10000);
        res.redirect("/manager/");
        // regenerate re id, re ck ma
        // reload cause session store get
        */
    }
    
    api.route("/sign-in").post(validate, signIned, existed, session({
        secret: "ciklid",
        resave: false,
        saveUninitialized: false,
        rolling: true,
        store: new RedisStore({
            host: "127.0.0.1",
            port: 6379,
            ttl: 900
        }),
        name: "_-",
        genid: function(req) {
            var o = req.body;
            // console.log("sg", icrypto.sha1(o.email.trim() + o.pwd));
            return icrypto.sha1(o.email.trim() + o.pwd);
        }
    }), setup);
};
