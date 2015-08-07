module.exports = function(manager) {
    var React = require('react');
    manager.route("/sign-up").get(function(req, res) {
        res.render('sign-up', {
            formSignUp: React.renderToString(
                React.createFactory(require('../../jsxes/sign-up'))()
            ),
            bundle: "sign-up-bundle"
        });
    });
};
