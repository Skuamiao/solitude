module.exports = function router(solitude, express) {
    var api = express(),
        manager = express(),
        bp = require("body-parser"),
        session = require("express-session"),
        RedisStore = require("connect-redis")(session),
        // redis = require("redis"),
        // ref seesion build
        crypto = require("crypto-js"),
        cookieParser = require("cookie-parser");

    // manager use
    manager.use(cookieParser());
    
    // api use
    /* session build
     * 可能只对登录和注册建立 session
     * 此外，如果存在 signedcookie，则尝试匹配 session
     */
    api.use(cookieParser(), bp.urlencoded({ extended: true }), session({
        secret: "ciklid",
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 10000},
        store: new RedisStore({
            host: "127.0.0.1",
            port: 6379,
            ttl: 10,
            pass: "redis&8296"
        }),
        name: "_-",
        genid: function(req) {
            var o = req.body || "";
            if (!o) return;
            code = crypto.SHA1(o.email + o.pwd).toString();
            // console.log(o, o.email + o.pwd, " - ", code);
            
            return "mk" || code;
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
    require("../api/sign-up")(api);

    // 登录 api
    require("../api/sign-in")(api);

    // manager midware
    solitude.use("/manager", manager);
    // api midware
    solitude.use("/api", api);
    // 404 midware
    require("../routes/nothing")(solitude);
};
