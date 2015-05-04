var sadness = require("express")();
sadness.route("/sadness").get(function(req, res) {
    res.send("about sadness page");
});
module.exports = sadness;
