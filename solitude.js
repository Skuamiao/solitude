var express = require("express");
    logger = require("./utils/logger"),
    solitude = express(),
    api = express(),
    manager = express(),
    bp = require("body-parser");

require("./utils/confman")(function(conf) {
    // morgan in logger
    solitude.use(logger(conf));

    // require("./utils/cssman")(conf);

    // solitude.set("x-powered-by", false);

    // siwg template
    require("./utils/tplman")(solitude);

    // favicon IN TEST
    require("./utils/faviconman")(solitude, conf);
    // serve static
    require("./utils/staticman")(solitude);

    // routes
    require("./utils/router")(solitude, api, bp);

    solitude.listen(8000);

});
