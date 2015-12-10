var express = require('express'),
    solitude = express(),
    view = express();

solitude.set('view engine', 'jade');

solitude.use('/images', express.static('assets/images', {index: false}));
solitude.use('/styles', express.static('assets/styles', {index: false}));
solitude.use('/scripts', express.static('assets/scripts', {index: false}));
solitude.use('/fonts', express.static('assets/fonts', {index: false}));
solitude.use('/builds', express.static('assets/builds', {index: false}));

require('./routes/router')({
  view: view
});
solitude.use(view);
solitude.use('/.*$', function(req, res) {
  res.end('404');
});

solitude.listen(8008);

console.log('listen to http://localhost:8008/');
