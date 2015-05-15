module.exports = function router(solitude, express) {
    var api = express(),
        manager = express(),
        bp = require("body-parser"),
        cookieParser = require("cookie-parser")("ciklid");

    function routeGuide() {

    }

    function apiGuide() {

    }

    function authentication(req, res, next) {
        var sc = req.signedCookies["_-"],
            cli = null;

        if(!sc)
            next();
        else {
            cli = require("redis").createClient();
            cli.get(
                "sess:" + sc,
                function(err, reply) {
                    // todo something
                    if(err) throw err;
                    if(reply)
                        res.locals.authenticated = true;
                    next();
                }
            );
        }
    };

    // 404 midware
    // require("../routes/nothing")(solitude);

    solitude.use("/manager", manager);
    solitude.use("/api", api);

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

    // 管理文章
    require("../routes/manage")(manager);

    // 上传文件
    require("../routes/upload")(manager);

    // 添加文章
    require("../routes/add-article")(manager);



    // 注册 api
    require("../api/sign-up")(api);

    // 登录 api
    require("../api/sign-in")(api);

    // 退出 api
    require("../api/add-article")(api);

    // 添加文章 api
    require("../api/sign-out")(api);

    // 上传文件 api
    require("../api/upload")(api);

    solitude.use(function(req, res) {
        res.status(404).end("404");
    });

};
