var index = require("express")();
index.route(["/", "/index"])
        .get(function(req, res) {
            res.send("index page");
        });
module.exports = index;
