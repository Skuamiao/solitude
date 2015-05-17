module.exports = function router(solitude, express) {
    var api = express(),
        manager = express(),
        bp = require("body-parser"),
        cookieParser = require("cookie-parser")("ciklid");

    function via(app) {
        return {
            guide: function(route) {
                require(route)(app);
            }
        }
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

    solitude.use("/manager", manager);
    solitude.use("/api", api);

    manager.use(cookieParser, authentication);
    api.use(cookieParser, bp.urlencoded({ extended: true }), authentication);


    // index
    // require("../routes/index")(solitude);
    via(solitude).guide("./index");

    // 404
    solitude.use(function(req, res) {
        res.status(404).end("404");
    });

    // 管理
    via(manager).guide("./manager.index");

    // 注册
    via(manager).guide("./manager.sign.up");

    // 登录
    via(manager).guide("./manager.sign.in");

    // 管理文章
    via(manager).guide("./manager.manage");

    // 上传文件
    via(manager).guide("./manager.upload");

    // 添加文章
    via(manager).guide("./manager.add.article");



    // 注册 api
    via(api).guide("./api.sign.up");

    // 登录 api
    via(api).guide("./api.sign.in");

    // 退出 api
    via(api).guide("./api.add.article");

    // 添加文章 api
    via(api).guide("./api.sign.out");

    // 上传文件 api
    via(api).guide("./api.upload");

};
