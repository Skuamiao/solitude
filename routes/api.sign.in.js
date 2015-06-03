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
            date: new Date()
        };

    function validate(req, res, next) {
        // console.log(req.body);
        var rt = require("../utils/rules").validateSignIn(req.body);
        if(rt.succeeded) {
            res.locals.data = rt;
            next();
        }else {
            local.data = rt;
            res.status(200).type("html").render("manager-sign-in", local);
        }
    }

    function signIned(req, res, next) {
        var data = res.locals.data,
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
                            local.data = {
                                succeeded: 0,
                                msg: "该用户登录中"
                            };
                            res.status(200).type("html")
                                            .render("manager-sign-in", local);
                        }else
                            next();
                    cli.quit();
                }
            );
        else
            next();
    }

    function existed(req, res, next) {
        var data = res.locals.data,
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
                                local.data = {
                                    succeeded: 0,
                                    msg: "邮箱或密码错误"
                                };
                                res.status(200).type("html")
                                            .render("manager-sign-in", local);
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
            req.sessionStore.set(req.sessionID, req.session, function(err) {
                res
                .cookie("_@", res.locals.name, {maxAge: 86400e3 * 14,
                                httpOnly: true, signed: true, path: "/"})
                .redirect("/manager/");
            });
        }else
            req.sessionStore.set(req.sessionID, req.session, function(err) {
                res
                .cookie("_@", res.locals.name,
                                    {httpOnly: true, signed: true, path: "/"})
                .redirect("/manager/");
            });
    }

    api.route("/sign-in").post(validate, signIned, existed, isession,
                                                            regenerated, setup);
};
