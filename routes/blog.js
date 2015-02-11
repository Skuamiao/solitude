var blog = require("express")();
blog.route("/blog")
    .get(function(req, res) {
        res.send("blog page");
    });
module.exports = blog;
