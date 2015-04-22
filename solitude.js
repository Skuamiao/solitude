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
    require("./helpers/tplman")(solitude);

    // favicon IN TEST
    require("./helpers/faviconman")(solitude, conf);
    // serve static
    require("./helpers/staticman")(solitude);

    // routes
    require("./helpers/router")(solitude, express);

    solitude.listen(8000);

});
