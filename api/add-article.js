module.exports = function addArticle(api) {
    api.route("/add-article").post(function(req, res) {
        var lhl = require("highlight.js"),
            mi = require("markdown-it")({
                langPrefix: "hljs ",
                highlight: function (str, lang) {
                    if (lang && lhl.getLanguage(lang))
                        try {
                            return lhl.highlight(lang, str).value;
                        } catch (__) {}

                    try {
                        return lhl.highlightAuto(str).value;
                    } catch (__) {}

                    return "";
                }
            });
        if(res.locals.authenticated) {
            console.log(req.body);
            /*
            res.status(200).type("html").render("pages/add-article", {
                title: "管理",
                date: new Date(),
                md: mi.render(req.body.at)
            });
            */
            res.end("end");
        }else
            res.redirect("/");
    });
};
