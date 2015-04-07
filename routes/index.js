var index = function(solitude) {
    solitude
    .route("/")
    .get(function(req, res) {
        res.status(200).type("html").render("pages/index", {
            title: "首页",
            date: new Date()
        });
    });
};
module.exports = index;
