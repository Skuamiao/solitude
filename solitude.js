var compression = require('compression'),
    express = require("express"),
    solitude = express();

solitude.set('view engine', 'jade');

solitude.use(compression());

solitude.use('/assets', express.static('assets/images', {index: false}));
solitude.use('/assets', express.static('assets/styles', {index: false}));
solitude.use('/assets', express.static('assets/scripts', {index: false}));
solitude.use('/assets', express.static('assets/fonts', {index: false}));

solitude.get('/sign-in', function(req, res) {
    res.flush();
    res.render('sign-in', {formSignIn: 'abc'});
});

solitude.listen(8000);

console.log("http://localhost:8000/");
// require("./utils/cssman")();

// morgan in logger
// solitude.use(require("./utils/logger")());

// solitude.set("x-powered-by", false);
// solitude.set("trust proxy", 1);

// siwg template
// require("./helpers/tplman")(solitude);

// favicon IN TEST
// require("./helpers/faviconman")(solitude);
// serve static
// require("./helpers/staticman")(solitude);

// routes
// require("./routes/router")(solitude, express);
/*solitude.get("/", function(req, res) {
    res.end("hi solitude");
});*/

