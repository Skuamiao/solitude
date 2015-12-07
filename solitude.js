var express = require('express'),
    solitude = express();

solitude.set('view engine', 'jade');

solitude.use('/images', express.static('assets/images', {index: false}));
solitude.use('/styles', express.static('assets/styles', {index: false}));
solitude.use('/scripts', express.static('assets/scripts', {index: false}));
solitude.use('/fonts', express.static('assets/fonts', {index: false}));
solitude.use('/builds', express.static('assets/builds', {index: false}));

solitude.get('/', function(req, res) {
  res.render('layout');
});

solitude.listen(8008);

console.log('listen to http://localhost:8008/');

/*var express = require('express'),
    solitude = express(),
    manager = express(),
    api = express(),
    compression = require('compression'),
    cookieParser = require('cookie-parser');

api.use(cookieParser('ciklid'));

solitude.set('view engine', 'jade');

// solitude.use(compression());

solitude.use('/assets', express.static('assets/images', {index: false}));
solitude.use('/assets', express.static('assets/styles', {index: false}));
solitude.use('/assets', express.static('assets/scripts', {index: false}));
solitude.use('/assets', express.static('assets/fonts', {index: false}));

solitude.use('/manager', manager);
solitude.use('/api', api);
require('./routes/router')({
    solitude: solitude,
    manager: manager,
    api: api
});

solitude.use(function(req, res) {
    res.send("room 404");
});

solitude.listen(8000);

console.log("http://localhost:8000/");
*/
/*
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
*/
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

/*
var imageMagick = require('gm').subClass({imageMagick: true});
imageMagick('./assets/images/code-base.png').fontSize(14).drawText(3, 16,'1 2 3 4').implode(0.4).mosaic().write('./assets/images/1234.png', function(err) {
    if(err) throw err;
    console.log('done');
})
*/
