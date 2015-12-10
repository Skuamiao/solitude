module.exports = function(app) {
  app
    .route("/sign-up")
    .get(function(req, res) {
      res.end('sign-up');
      console.log(req.is('text/*'));
      console.log('r', req.route);
    });
};
