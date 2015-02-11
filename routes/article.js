var article = require("express")();
article.route("/article")
        .get(function(req, res) {
            res.send("article page");
        });
module.exports = article;
