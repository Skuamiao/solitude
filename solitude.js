console.log('solitude.js');
//最下面
var express = require('express'),
    solitude = express();
app.get('/a', function(req, res) {....});
app.get('/b', function(req, res) {....});
    https = require('https'),
    fs = require("fs");

var options = {
  key: fs.readFileSync('./private-key.pem'),
  cert: fs.readFileSync('./certificate.pem')
};

https.createServer(options, app).listen(8008, function () {
  console.log('Https server listening on port ' + 8008);
});
