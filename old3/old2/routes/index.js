module.exports = function(solitude) {
    // var React = require('react');
    solitude.route("/").get(function(req, res) {
        res.send('index');
        /*res.render('sign-up', {
            formSignUp: React.renderToString(
                React.createFactory(require('../../jsxes/sign-up'))()
            ),
            bundle: "sign-up-bundled"
        });*/
    });
};