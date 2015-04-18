module.exports = function router(solitude, express) {
    var api = express(),
        manager = express(),
        bp = require("body-parser"),
        session = require("express-session"),
        RedisStore = require("connect-redis")(session),
        // redis = require("redis"),
        // ref seesion build
        crypto = require("./icrypto"),
        cookieParser = require("cookie-parser");

    // manager use
    manager.use(cookieParser("ciklid"));
    api.use(cookieParser("ciklid"), bp.urlencoded({ extended: true }));
    
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
