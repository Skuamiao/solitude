var logger = require("./utils/logger"),
    express = require("express"),
    solitude = express();

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
