module.exports = function(api) {
    api.route('/').get(function(req, res) {
        // console.log(req.signedCookies['_<']);
        res.send('api index');
    });
};
