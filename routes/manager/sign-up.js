module.exports = function(manager) {
    var // React = require('react'),
        session = require("express-session"),
        RedisStore = require("connect-redis")(session),
        store = new RedisStore({ttl: 120}),
        sess = session({
            secret: "ciklid",
            resave: false,
            name: '_-',
            saveUninitialized: false,
            store: store,
            rolling: true
        });
    manager.route("/sign-up").get(sess, function(req, res) {
        console.log(req.sessionID, req.session);
        store.set(req.sessionID, req.session, function(err) {
            if(err) throw err;
        });
        res.render('sign-up', {
            // formSignUp: React.renderToString(
            //     React.createFactory(require('../../jsxes/sign-up'))()
            // ),
            bundle: "bundle-sign-up"
        });
    });
};
