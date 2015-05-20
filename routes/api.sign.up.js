module.exports = function signUp(api) {
    var icrypto = require("../utils/icrypto"),
        local = {
            title: "注册",
            date: new Date(),
            signInfo: null
        };

    function validate(req, res, next) {
        var rt = require("../utils/rules").validateSignUp(req.body);
        if(rt.succeeded) {
            res.locals.signInfo = rt;
            next();
        }else {
            local.signInfo = rt;
            res.status(200).type("html").render("pages/sign-up", local);
        }
    }

    function matchedSession(req, res, next) {
        var data = res.locals.signInfo.data,
            mark = icrypto.sha1(data.email) + icrypto.sha1(data.pwd1),
            cli = require("redis").createClient();

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
                        msg: "某些注册信息已存在"
                    };
                    res.status(200).type("html").render("pages/sign-up", local);
                }else
                    next();
            cli.quit();
        });
    }

    function store(req, res, next) {
        var data = res.locals.signInfo.data,
            pgn = require("pg-native"),
            cli = new pgn();
        cli.connect(function(err) {
            if(err)
                // todo something
                throw err;
            else
                cli.query(
                    "select set_author($1, $2, $3)",
                    [data.email, icrypto.sha1(data.pwd1), data.name],
                    function(err, rows) {
                        var mark = 0;
                        if(err)
                            // todo something
                            throw err;
                        else {
                            mark = rows[0].set_author;
                            if(mark > 0)
                                next();
                            else if(mark < 0)
                                throw new Error("诡异问题来临");
                            else {
                                local.signInfo = {
                                    succeeded: 0,
                                    msg: "某些注册信息已存在"
                                };
                                res.status(200).type("html")
                                                .render("pages/sign-up", local);
                            }
                        }
                        cli.end();
                    }
                );
        });

    }

    api.route("/sign-up").post(validate, matchedSession, store,
        function(req, res) {
            res.redirect("/manager/");
        }
    );

};
