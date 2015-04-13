var logger = require("./utils/logger"),
    express = require("express"),
    solitude = express();
/*
    // test redis
    redis = require("redis"),
    rc = redis.createClient(6379, "127.0.0.1", {auth_pass: "redis&8296"});
    
rc.on("error", function (err) {
    console.log(err);
});

rc.on("connect", function() {
    console.log("redis connected!", rc.connected);
    
    rc.setex("tk", 10, "test key");
    
    // rc.quit();
});

setInterval(function() {
    rc.get("tk", function(err, data) {
        if(err) throw err;
        else console.log(data);
    });
}, 1000);
*/

require("./utils/confman")(function(conf) {
    // morgan in logger
    solitude.use(logger(conf));

    // require("./utils/cssman")(conf);

    // solitude.set("x-powered-by", false);
    solitude.set("trust proxy", 1);

    // siwg template
    require("./utils/tplman")(solitude);

    // favicon IN TEST
    require("./utils/faviconman")(solitude, conf);
    // serve static
    require("./utils/staticman")(solitude);

    // routes
    require("./utils/router")(solitude, express);

    solitude.listen(8000);

});
