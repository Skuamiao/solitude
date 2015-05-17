module.exports = function addArticle(api) {
    var local = {
            title: "添加文章",
            date: new Date(),
            data: null
        };

    function validate(req, res, next) {
        // console.log(req.body);
        var rt = require("../utils/rules").validateArticle(req.body);
        if(rt.succeeded) {
            res.locals.data = rt;
            next();
        }else {
            local.data = rt;
            res.status(200).type("html").render("pages/add-article", local);
        }
    }

    function store(req, res, next) {
        var pgn = require("pg-native"),
            cli = new pgn(),
            data = res.locals.data,
            hider = parseInt(require("../utils/icrypto").unescape(data.hider),
                                                                            10);

        cli.connect(function(err) {
            if(err)
                // todo something
                throw err;
            else
                cli.query(
                    "select set_article($1, $2, $3, $4)",
                    [data.title, data.at, data.state, hider],
                    function(err, rows) {
                        var mark = 0;
                        if(err)
                            // todo something
                            throw err;
                        else {
                            mark = rows[0].set_article;
                            if(mark > 0)
                                next();
                            else if(mark === 0) {
                                local.data = (function(data) {
                                    data.succeeded = 0;
                                    data.msg = "文章标题过长";
                                    return data;
                                })(data);
                                res.status(200).type("html")
                                            .render("pages/add-article", local);
                            }else
                                throw new Error("诡异问题来临");
                        }
                        cli.end();
                    }
                );
        });
    }

    api.route("/add-article").post(function(req, res, next) {
        if(res.locals.authenticated) next();
        else res.redirect("/");
    }, validate, store, function(req, res, next) {
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
        local.data = res.locals.data;
        local.md = mi.render(local.data.at);
        res.status(200).type("html").render("pages/add-article", local);
    });

    /*
    api.route("/add-article").post(function(req, res) {
        var lhl = null,
            mi = null,
            pgn = null,
            cli = null,
            md = null;

        if(res.locals.authenticated) {
            lhl = require("highlight.js");
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
            console.log(req.body);
            res.status(200).type("html").render("pages/add-article", {
                title: "管理",
                date: new Date(),
                data: req.body,
                md: mi.render(req.body.at)
            });
        }else
            res.redirect("/");
    });
    */
};
