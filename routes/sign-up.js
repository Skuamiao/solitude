module.exports = function(app) {
  app
    .route("/sign-up")
    .get(function(req, res) {
      res.render('sign-up', {
        entry: 'sign-up/bundle-sign-up'
      });
    });
};
