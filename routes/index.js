module.exports = function(solitude) {
  solitude
    .route("/")
    .get(function(req, res) {
      res.send('index');
    });
};
