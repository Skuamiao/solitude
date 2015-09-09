module.exports = function(api) {
    var imageMagick = require('gm').subClass({imageMagick: true}),
        session = require("express-session"),
        RedisStore = require("connect-redis")(session),
        store = new RedisStore({ttl: 120}),
        sess = session({
            secret: "ciklid",
            resave: false,
            name: '_<',
            saveUninitialized: false,
            store: store,
            cookie: {
                path: '/'
            },
            rolling: true
        });
    api.route('/verify').get(sess, function(req, res) {
        console.log(req.sessionID, req.session);
        imageMagick('./assets/images/code-base.png')
        .fill('#53c619')
        .fontSize(14)
        .drawText(3, 16,'1 2 3 4')
        .swirl(-67)
        .toBuffer('png', function(err, buf) {
            if(err) {
                console.log(err);
                res.sendFile('verify-demo.png', {
                    root: './assets/images'
                });
            }else {
                store.set(req.sessionID, req.session, function(err) {
                    if(err) {
                        console.log(err);
                    }else {
                        res.send(buf);
                    }
                });
            }
        });
    });
    
};
