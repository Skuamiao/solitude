module.exports = function(solitude, express) {
    var api = express(),
        manager = express(),
        bp = require("body-parser"),
        cookieParser = require("cookie-parser")("ciklid");

    function via(app) {
        return {
            guide: function(route) {
                require(route)(app);
                return this;
            },
            "notFound": function() {
                app.use(function(req, res) {
                    res.status(404).end("404");
                });
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
    }

    manager.use(cookieParser, authentication);

    via(manager)
    // 管理首页
    .guide("./manager.index");
    // // 注册
    // .guide("./manager.sign.up")
    // // 登录
    // .guide("./manager.sign.in")
    // // 管理文章
    // .guide("./manager.manage")
    // // 上传文件
    // .guide("./manager.upload")
    // // 添加文章
    // .guide("./manager.add.article");

    solitude.use("/manager", manager);


    // api.use(cookieParser, bp.urlencoded({ extended: true }), authentication);
    //
    // via(api)
    // // 注册 api
    // .guide("./api.sign.up")
    // // 登录 api
    // .guide("./api.sign.in")
    // // 退出 api
    // .guide("./api.add.article")
    // // 添加文章 api
    // .guide("./api.sign.out")
    // // 上传文件 api
    // .guide("./api.upload");
    //
    // solitude.use("/api", api);

    // index
    via(solitude).guide("./index");

    // 404
    via(solitude).notFound();

    // solitude.use(function(req, res) {
    //     res.status(404).end("404");
    // });

};
