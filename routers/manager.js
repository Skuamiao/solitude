var manager = require('express').Router();

manager.get('/', function(req, res) {
  res.send('Hello, here is manager index!');
});

manager.get('/sign-up', function(req, res) {
  res.render('sign-up', {customize_header: true}, function(err, html) {
    if(err) {
      res.send('Oh God!');
    }else {
      res.status(200).type('html').send(html);
    }
  });
});

/*manager.use(function(req, res) {
  res.status(404).send('Oh my! 404!');
});*/

module.exports = manager;
