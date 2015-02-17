var nothing = require("express")();
nothing.use(function(req, res) {
    res.status(404).send("404 page");
});
module.exports = nothing;
