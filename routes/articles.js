var articles = require("express")();
articles.route(["/articles"]).get(function(req, res) {
    // console.log("articles");
    res.send("articles page");
});
module.exports = articles;
