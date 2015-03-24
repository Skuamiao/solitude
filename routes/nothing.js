var nothing = function(solitude) {
    solitude.use(function(req, res) {
        res.status(404).end("404");
    });
};
module.exports = nothing;
