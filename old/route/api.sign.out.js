module.exports = function signOut(api) {
    api.route("/sign-out").get(function(req, res) {
        var cookies = null,
            l = 0;
        if(res.locals.authenticated) {
            cookies = Object.keys(req.signedCookies);
            l = cookies.length;
            while(l--)
                res.clearCookie(cookies[l]);
        }
        res.redirect("/");
    });
};
