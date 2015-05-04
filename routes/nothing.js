module.exports = function nothing(solitude) {
    solitude.use(function(req, res) {
        res.status(404).end("404");
    });
};
