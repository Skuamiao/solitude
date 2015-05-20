/* 添加文章
 */
module.exports = function addArticle(manager) {
    manager.route("/add-article").get(function(req, res) {
        var pgn = null,
            cli = null,
            icrypto = require("../utils/icrypto");
        if(res.locals.authenticated) {
            pgn = require("pg-native");
            cli = new pgn();
            cli.connect(function(err) {
                if(err)
                    // todo something
                    throw err;
                else
                    cli.query("select get_author_id($1)",
                        [req.signedCookies["_-"]],
                        function(err, rows) {
                            if(err)
                                // todo something
                                throw err;
                            else {
                                /*console.log("." + mark + ".",
                                                        mark.length, req.body);*/
                                res.status(200).type("html")
                                    .render("manager-add-article",
                                    {
                                        title: "添加文章",
                                        date: new Date(),
                                        data:  {
                                            hider: icrypto.escape(
                                                        rows[0].get_author_id)
                                        }
                                    }
                                );
                            }
                            cli.end();
                        }
                    );
            });
        }else
            res.redirect("/manager/");
        /*
        if(res.locals.authenticated)
            res.status(200).type("html").render("pages/add-article", {
                title: "管理文章",
                date: new Date(),
                user: require("../utils/icrypto")
                                            .unescape(req.signedCookies["_@"])
            });
        else
            res.redirect("/manager/");
        */
    });
};
