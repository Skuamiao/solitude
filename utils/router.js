module.exports = function router(solitude, express) {
    var api = express(),
        manager = express(),
        bp = require("body-parser"),
        session = require("express-session"),
        // sfs = require("session-file-store")(session),
        crypto = require("crypto-js"),
        cookieParser = require("cookie-parser");

    // manager session
    manager.use(cookieParser(), session({
        secret: "ciklid",
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 180000},
        name: "_-",
        // store: new sfs({ttl: 120}),
        genid: function(req) {
            // console.log(req.cookies, "genid");
            // return crypto.SHA1("mailpasswordname").toString();
            var code = "mailpasswordname";
            return code;
        }
    }));
    
    // index
    require("../routes/index")(solitude);
    
    // 管理
    require("../routes/manager")(manager);
    
    // 注册
    require("../routes/sign-up")(manager);
    
    // 登录
    require("../routes/sign-in")(manager);
    
    // 注册 api
    require("../api/sign-up")(api, bp);

    // 登录 api
    require("../api/sign-in")(api, bp);

    // manager midware
    solitude.use("/manager", manager);
    // api midware
    solitude.use("/api", api);
    // 404 midware
    require("../routes/nothing")(solitude);
};
