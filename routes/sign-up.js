/* 注册
 * 存在签名 cookie _-，
 * 匹配上 session，提示已登录
 */
module.exports = function signUp(manager) {
    manager
    .route("/sign-up")
    .get(function(req, res) {
        var buffer = require("buffer"),
            redis = require("redis"),
            cli = redis.createClient(),
            cookieParser = require("cookie-parser"),
            nodemailer = require("nodemailer"),
            // smtpTransport = require("nodemailer-smtp-transport");
            // nwk = require("nodemailer-wellknown"),
            name = req.cookies["_@"],
            sc = req.cookies["_-"];
        
        
        // create reusable transporter object using SMTP transport
        var transporter = nodemailer.createTransport({
            service: "Yahoo",
            auth: {
                user: "rong8296",
                pass: "Yahoo&8296"
            }
        });

        // NB! No need to recreate the transporter object. You can use
        // the same transporter object for all e-mails

        // setup e-mail data with unicode symbols
        /*
        var mailOptions = {
            from: "rong8296@gmail.com", // sender address
            to: "hjr@duzhoumo.com', // list of receivers
            subject: "nm", // Subject line
            text: "hello nm", // plaintext body
            html: "<h1>I Love NM</h1>" // html body
        };
        */
        // send mail with defined transport object
        transporter.sendMail({
            from: "rong8296@yahoo.com", // sender address
            to: "rong8296@gmail.com", // list of receivers
            subject: "nm", // Subject line
            html: "<h1 style='color: maroon;'>I Love NM</h1>" // html body
        }, function(error, info){
            if(error)
                console.log(error);
            else
                console.log('Message sent: ' + info.response, info);
        });
        
        
        if(sc)
            cli.get(
                "sess:" + cookieParser.signedCookie(sc, "ciklid"), 
                function(err, reply) {
                    cli.quit();
                    if(err) {
                        // todo something
                        console.log(err);
                    }else {
                        if(reply) 
                            console.log("登录中");
                        else
                            console.log("注册");
                    }
                }
            );
        
        /*,
            nb = new buffer.Buffer("我");
            nb2 = null;
        console.log(nb);
        console.log(nb.toString("base64"));
        nb2 = new buffer.Buffer(nb.toString("base64"), "base64");
        console.log(nb2.toString());
        */
        
        
        /*
        var id = req.cookies["_-"];
        console.log(req.cookies, " ||| cok");
        console.log(req.sessionID);
        id && console.log(
            cookieParser.signedCookie(req.cookies["_-"], "ciklid"), 
            " unsigned"
        );
        
        if(!id) {
            req.sessionStore.set(req.sessionID, req.session, function(err, session) {
                if(err) console.log("set failed! ---");
                else console.log("set ok! ---");
            });
        }else {
            req.sessionStore.get(req.sessionID, function(err, session) {
                if(session) console.log("get ok! ===");
                else console.log("get failed! ===");
                
            });
        }
        */
        if(name) 
            name = new buffer.Buffer(name, "base64").toString();
            
        res.status(200).type("html").render("pages/sign-up", {
            title: "注册",
            date: new Date(),
            name: name
        });
        
    });
};
