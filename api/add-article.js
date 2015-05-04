module.exports = function addArticle(api) {
    api.route("/add-article").post(function(req, res) {
        if(res.locals.authenticated)
            res.end(req.body.at);
        else
            res.redirect("/");
    });
};
