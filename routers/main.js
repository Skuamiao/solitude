var main = require('express').Router();

main.get('/', function(req, res) {
  res.send('Hello, here is index!');
});

module.exports = main;
