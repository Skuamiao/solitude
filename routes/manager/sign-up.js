module.exports = function(manager) {
    var React = require('react'),
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
        /*require('babel-core')
            .transformFile('./jsxes/sign-up.jsx', function(err, rt) {
                if(err) throw err;
                // res.end(rt.code);
                res.render('sign-up', {
                    formSignUp: React.renderToString(
                        React.createFactory(eval(rt.code))()
                    ),
                    bundle: "bundle-sign-up"
                });
            });*/
        res.render('sign-up', {
            // formSignUp: React.renderToString(
            //     React.createFactory(require('../../jsxes/sign-up.jsx'))()
            // ),
            bundle: "bundle-sign-up"
        });
    });
};
