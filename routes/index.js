var index = function(solitude) {
    solitude
    .route("/")
    .get(function(req, res) {
        res.status(200).type("html").render("index", {
            title: "首页",
            date: new Date()
        });
    });
};
module.exports = index;
