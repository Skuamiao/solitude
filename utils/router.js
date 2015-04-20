module.exports = function router(solitude, express) {
    var api = express(),
        manager = express(),
        bp = require("body-parser"),
        cookieParser = require("cookie-parser")("ciklid"),
        authentication = require("./authentication");
    
    manager.use(cookieParser, authentication);    
    api.use(cookieParser, bp.urlencoded({ extended: true }), authentication);
    
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
    
    
    solitude.use("/manager", manager);
    solitude.use("/api", api);
    
    // 404 midware
    require("../routes/nothing")(solitude);
};
