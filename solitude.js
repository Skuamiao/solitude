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

var tls = require('tls'),
    fs = require('fs'),
    http = require('http'),
    https = require('https'),
    express = require('express'),
    solitude = express(),
    options = {
      key: fs.readFileSync('private-key.pem'),
      cert: fs.readFileSync('public-cert.pem')
    };

solitude.get('/', function(req, res) {
  res.send('Hello World!');
});

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
