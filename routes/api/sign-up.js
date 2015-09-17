module.exports = function(api) {
    api.route('/sign-up').post(
        require('body-parser').urlencoded({ extended: false }), 
        function(req, res) {
            console.log(req.body);
            res.send('sign-up post');
        }
    );
    /*var redis = require('redis'),
        imageMagick = require('gm').subClass({imageMagick: true}),
        session = require('express-session'),
        RedisStore = require('connect-redis')(session),
        store = new RedisStore({ttl: 300}),
        sess = session({
            secret: 'ciklid',
            resave: false,
            name: '_^',
            saveUninitialized: false,
            store: store,
            cookie: {
                path: '/api',
                maxAge: 300000
            },
            rolling: true
        });

    function getVerificationCode() {
        var code = Math.floor(Math.random() * 10000);
        if(code < 1000) {
            code += 1000;
        }
        return code.toString();
    }
    function formatted(codes) {
        return codes.split('').join(' ');
    }

    api.route('/verify').get(sess, function(req, res) {
        console.log(req.sessionID, req.session);
        var codes = getVerificationCode();
        imageMagick('./assets/images/code-base.png')
            .fill('#53c619')
            .fontSize(14)
            .drawText(3, 16, formatted(codes))
            .swirl(-49)
            .toBuffer('png', function(err, buf) {
                if(err) {
                    console.log(err, 2);
                    res.sendFile('verify-demo.png', {
                        root: './assets/images'
                    });
                }else {
                    store.set(req.sessionID, req.session, function(err) {
                        if(err) {
                            console.log(err, 3);
                        }else {
                            redis.createClient().setex(req.sessionID + codes, 300, "1", function(err) {
                                    if(err) throw err;
                                }
                            );
                            res.send(buf);
                        }
                    });
                }
            });
    });*/
    
};
