/* 注册
 */
module.exports = function signUp(manager) {
    manager
    .route("/sign-up")
    .get(function(req, res) {
        var redis = require("redis"),
            cli = redis.createClient(),
            sc = req.signedCookies["_-"];
        
        // unset debug sc -> true
        if(sc) 
            cli.get(
                "sess:" +  sc, 
                function(err, reply) {
                    // unset debug -> true
                    if(err) 
                        // todo something
                        res.status(500).end(
                            "The red disappoints you!" + 
                            " Maybe, it will be fine soon!"
                        );
                    else 
                        // unset debug -> true
                        if(reply) res.redirect("/manager/");
                        else res.redirect("/manager/sign-in");
                    cli.quit();
                }
            );
        else 
            // console.log(res.locals);
            res.status(200).type("html").render("pages/sign-up", {
                title: "注册",
                date: new Date()
            });
        
    });
};
/*
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    service: "Yahoo",
    auth: {
        user: "rong8296",
        pass: "Yahoo&8296"
    }
});

transporter.sendMail({
    from: "rong8296@yahoo.com", 
    to: "rong8296@gmail.com", 
    subject: "nm", 
    html: "<h1 style='color: maroon;'>I Love NM</h1>" 
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
*/
/*,
    nb = new buffer.Buffer("我");
    nb2 = null;
console.log(nb);
console.log(nb.toString("base64"));
nb2 = new buffer.Buffer(nb.toString("base64"), "base64");
console.log(nb2.toString());
*/
