module.exports = function signOut(api) {
    api
    .route("/sign-out")
    .get(function(req, res) {
        var cookies = null,
            prop = null;
        if(res.locals.authenticated) {
            cookies = Object.keys(req.signedCookies);
            for(prop in cookies)
                res.clearCookie(prop);
            
            res.redirect("/");
        }
    });
};