var me = require("express")();
me.route("/me")
    .get(function(req, res) {
        res.send("me page");
    });
module.exports = me;
