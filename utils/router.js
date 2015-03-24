var router = function(solitude, api, bp) {
    // index
    require("../routes/index")(solitude);

    // 注册
    require("../routes/sign-up")(solitude);



    // 注册 api
    require("../api/sign-up")(api, bp);

    // api midware
    solitude.use("/api", api);
    // 404 midware
    require("../routes/nothing")(solitude);
};
module.exports = router;
