module.exports = function signIn(api) {
    var icrypto = require("../utils/icrypto"),
        session = require("express-session"),
        RedisStore = require("connect-redis")(session),
        isession = session({
            secret: "ciklid",
            resave: false,
            saveUninitialized: false,
            rolling: true,
            store: new RedisStore(/*{
                host: "127.0.0.1",
                port: 6379
            }*/),
            name: "_-",
            genid: function(req) {
                var o = req.body;
                return icrypto.sha1(o.email.trim()) + icrypto.sha1(o.pwd);
            }
        }),
        local = {
            title: "登录",
            date: new Date(),
            signInfo: null
        };

    function validate(req, res, next) {
        // console.log(req.body);
        var rt = require("./rules").validateSignIn(req.body);
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
            mark = icrypto.sha1(data.email) + icrypto.sha1(data.pwd),
            cli = require("redis").createClient(),
            sc = res.locals.sc = req.signedCookies["_-"];
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
                                res.locals.name = icrypto.escape(mark);
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

    function regenerated(req, res, next) {
        if(res.locals.sc)
            req.session.regenerate(function(err) {
                // todo something
                if(err) throw err;
                next();
            });
        else next();
    }

    function setup(req, res) {
        // console.log(req.sessionStore.touch.toString());
        if(req.body.dur) {
            req.session.cookie.maxAge = 86400e3 * 14;
            req.sessionStore.touch(req.sessionID, req.session, function(err) {
                if(err) throw err;
                req.sessionStore.set(req.sessionID, req.session, function(err) {
                    res
                    .cookie("_@", res.locals.name, {maxAge: 86400e3 * 14,
                                    httpOnly: true, signed: true, path: "/"})
                    .redirect("/manager/");
                });
            });
        }else
            req.sessionStore.set(req.sessionID, req.session, function(err) {
                res
                .cookie("_@", res.locals.name,
                                    {httpOnly: true, signed: true, path: "/"})
                .redirect("/manager/");
            });
        /*
        req.sessionStore.set(req.sessionID, req.session, function(err) {
            // todo something
            if(err) throw err;
            else {
                console.log(req.body.dur);
                if(req.body.dur) {
                    req.session.cookie.maxAge = 86400e3 * 14;
                    rs.touch(req.sessionID, req.session,
                        function(err) {
                            // todo something
                            if(err) throw err;
                            res
                            .cookie("_@", name, {maxAge: 86400e3 * 300,
                                    httpOnly: true, signed: true, path: "/"})
                            .redirect("/manager/");
                        }
                    );
                }else
                    res
                    .cookie("_@", name, {maxAge: 86400e3 * 300,
                            httpOnly: true, signed: true, path: "/"})
                    .redirect("/manager/");
            }
        });
        */
        /*
        if(req.body.dur) {
            ttl = 86400 * 14;
            maxAge = 86400e3 * 14;
            console.log(ttl, maxAge)
        }
        */
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

    api.route("/sign-in").post(validate, signIned, existed, isession,
                                                            regenerated, setup);
};
