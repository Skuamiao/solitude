module.exports = function(manager) {
    manager.route("/sign-up").get(function(req, res) {
        res.render('sign-up', {
            bundle: "bundle-sign-up"
        });
    });
};

/*
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
        try{
            store.set(req.sessionID, req.session, function(err) {
                if(err) {
                    console.log(err);
                }else {
                    console.log(req.sessionID, req.session);
                    res.render('sign-up', {
                        bundle: "bundle-sign-up"
                    });
                }
            });
        }catch(err) {
            console.log(err);
            res.render('sign-up', {
                bundle: "bundle-sign-up"
            });
        }
        
    });
};
*/

/* for server rendering */
/*formSignUp: React.renderToString(
    React.createFactory(require('../../jsxes/sign-up.js'))()
),*/

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
