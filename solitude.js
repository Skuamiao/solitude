var express = require("express"),
    solitude = express();

// require("./utils/cssman")();

// morgan in logger
// solitude.use(require("./utils/logger")());

// solitude.set("x-powered-by", false);
solitude.set("trust proxy", 1);

// siwg template
require("./helpers/tplman")(solitude);

// favicon IN TEST
// require("./helpers/faviconman")(solitude);
// serve static
require("./helpers/staticman")(solitude);

// routes
require("./routes/router")(solitude, express);

solitude.listen(8000);

console.log("http://localhost:8000/");
