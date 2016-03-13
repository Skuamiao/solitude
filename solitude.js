// var express = require('express');
// var solitude = express();
//
// solitude.get('/', function (req, res) {
//   res.send('Hello World!');
// });
//
// solitude.listen(8008, function () {
//   console.log('Example solitude listening on port 8008!');
// });

var // tls = require('tls'),
    fs = require('fs'),
    http = require('http'),
    https = require('https'),
    express = require('express'),
    solitude = express(),
    helmet = require('helmet'),
    compression = require('compression'),
    options = {
      key: fs.readFileSync('private-key.pem'),
      cert: fs.readFileSync('public-cert.pem')
    },
    main = require('./routers/main'),
    manager = require('./routers/manager');

solitude.set('view engine', 'jade');
// solitude.set('view cache', true);

solitude.use(helmet(), compression());
// solitude.use(helmet());
// solitude.use(compression());

solitude.use('/styles', express.static('assets/styles', {index: false}));
solitude.use('/scripts', express.static('assets/scripts', {index: false}));
solitude.use('/builds', express.static('builds', {index: false}));

solitude.use(main);
solitude.use('/manager', manager);

// http.createServer(solitude).listen(8080);

/*
* Using https module
*/

https.createServer(options, solitude).listen(8008, function() {
  console.log('https server listening on port ' + 8008);
});



/*
* Using tls module
*/
// tls.createServer(options, function (cleartextStream) {
//   cleartextStream.write("welcome!n");
//   cleartextStream.setEncoding('utf8');
//   cleartextStream.end();
// }).listen(8080);
