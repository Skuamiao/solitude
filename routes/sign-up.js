module.exports = function(solitude) {
  solitude
    .route('/sign-up')
    .get(function(req, res) {
      res.end('sign-up');
    });
};
