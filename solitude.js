var express = require('express'),
    solitude = express();

solitude.set('view engine', 'jade');

// solitude.use('/images', express.static('assets/images', {index: false}));
// solitude.use('/styles', express.static('assets/styles', {index: false}));
// solitude.use('/scripts', express.static('assets/scripts', {index: false}));
// solitude.use('/fonts', express.static('assets/fonts', {index: false}));
solitude.use('/builds', express.static('builds', {index: false}));

require('./routes/router')({
  solitude: solitude
});

solitude.use(function(req, res) {
  var rp = req.path,
      pattern = /^\/(?:images|styles|scripts|fonts|builds)\/\S+/g;
  if(rp === '/favicon.ico' || pattern.test(rp)) {
    res.status(404).end();
  }else {
    res.status(404).render('404');
  }
});

solitude.listen(8008);

console.log('listen to http://localhost:8008/');
