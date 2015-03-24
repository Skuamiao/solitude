var signUp = function(api, bp) {
    api
    .use(bp.urlencoded({ extended: true }))
    .route("/sign-up")
    .post( function(req, res) {
        res.status(200).end(JSON.stringify(req.body));
    });
};
module.exports = signUp;
