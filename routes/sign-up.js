var Cookies = require("cookies"),
    cookieParser = require("cookie-parser");
module.exports = function signUp(manager) {
    manager
    .route("/sign-up")
    .get(function(req, res) {
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
        
        res.status(200).type("html").render("sign-up", {
            title: "注册",
            date: new Date()
        });
        
    });
};
