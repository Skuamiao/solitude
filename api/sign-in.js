module.exports = function signIn(api) {
    var local = {
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
                    [data.email + crypto.SHA1(data.pwd)], 
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
                                    msg: "邮箱或密码错误，请更新后继续登录"
                                };
                                res.status(200).type("html")
                                                .render("pages/sign-in", local);
                            }
                        }
                        cli.end(function() {
                            console.log("connection ended!");
                        });
                    }
                );
        });
    }
    
    api.route("/sign-in").post(validate, existed, function(req, res) {
        var r = require("./rule");
            err = {
                pwda: "密码不正确",
                email: "邮箱不正确"
            },
            o = req.body,
            arr = [];
        if(!r.isEmail(o.email))
            arr.push(err.email);

        if(!r.isPwd(o.pwd))
            arr.push(err.pwda);

        if(arr.length)
            res.status(200).end(arr.join(";\n") + "!");
        else {
            res.status(200).end("all right!");
        }
    });
};
