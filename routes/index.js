module.exports = function index(solitude) {
    solitude.route("/").get(function(req, res) {
        res.status(200).type("html").render("pages/index", {
            title: "首页",
            date: new Date()
        });
    });
};
