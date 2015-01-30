var router = require("express")();
router.route(["/", "/index"]).get(function(req, res) {
    res.send("index page");
});
module.exports = router;
