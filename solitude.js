var compression = require('compression'),
    React = require('react'),
    express = require('express'),
    // api = require(),
    manager = express(),
    solitude = express();

solitude.set('view engine', 'jade');

solitude.use(compression());

solitude.use('/assets', express.static('assets/images', {index: false}));
solitude.use('/assets', express.static('assets/styles', {index: false}));
solitude.use('/assets', express.static('assets/scripts', {index: false}));
solitude.use('/assets', express.static('assets/fonts', {index: false}));

// require('./routes/manager/router')(manager);
solitude.use('/manager', manager);
require('./routes/router')({
    solitude: solitude,
    manager: manager
});

// solitude.use(/\.js$/, function(req, res) {
//     res.status(404).end();
// });
/*
{
    r: React.renderToString(
        React.createFactory(require('./views/ri'))({text: 'init text'})
    )
}
*/

// var gm = require('gm');
// gm('/assets/test.png').drawText(5, 2,'1234').write('./assets/path', function(a, b, c) {
//     console.log(a, b, c, this);
// })

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
