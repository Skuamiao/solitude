var articles = require("express")();
articles.route("/articles").get(function(req, res) {
    res.send("articles page");
});
module.exports = articles;
