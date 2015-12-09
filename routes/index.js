module.exports = function(solitude) {
  solitude
    .route('/')
    .get(function(req, res, next) {
      // res.send('index');
      next();
    }, function(req, res) {
      res.end('index 2');
    });
};
