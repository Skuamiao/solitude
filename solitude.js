var express = require('express'),
    solitude = express(),
    resource = express();

solitude.set('view engine', 'jade');

solitude.use('/images', express.static('assets/images', {index: false}));
solitude.use('/styles', express.static('assets/styles', {index: false}));
solitude.use('/scripts', express.static('assets/scripts', {index: false}));
solitude.use('/fonts', express.static('assets/fonts', {index: false}));
solitude.use('/builds', express.static('assets/builds', {index: false}));

require('./routes/router')({
  solitude: solitude,
  resource: resource
});

solitude.use(function(req, res) {
  console.log(req.is('text/*'));
  console.log('r', req.route);
  res.end('last one');
});

solitude.listen(8008);

console.log('listen to http://localhost:8008/');
