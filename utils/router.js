module.exports = function router(solitude, express) {
    var api = express(),
        manager = express(),
        bp = require("body-parser"),
        session = require("express-session"),
        sfs = require("session-file-store")(session);


    // manager session
    manager.use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: false
    }));
    
    // index
    require("../routes/index")(solitude);
    
    // 注册
    require("../routes/sign-up")(manager, new sfs({
        ttl: 60,
        reapInterval: 60
    }));
    // console.log(new sfs().get.toString());
    
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
