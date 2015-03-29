var router = function(solitude, express) {
    var api = express(),
        manager = express(),
        bp = require("body-parser");
    // index
    require("../routes/index")(solitude);

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
module.exports = router;
