module.exports = function(api) {
    var redis = require('redis'),
        imageMagick = require('gm').subClass({imageMagick: true}),
        session = require('express-session'),
        RedisStore = require('connect-redis')(session),
        sess = session({
            secret: 'ciklid',
            resave: false,
            name: '_^',
            saveUninitialized: false,
            store: new RedisStore({ttl: 300}),
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
        console.log('sid & sess', req.sessionID, req.session);
        var codes = getVerificationCode();
        imageMagick('./assets/images/code-base.png')
            .fill('#a2c36d')
            .fontSize(14)
            .drawText(2, 16, formatted(codes))
            // .swirl(-55)
            .toBuffer('png', function(err, buf) {
                if(err) {
                    console.log('verification image', err);
                }else {
                    req.sessionStore.set(req.sessionID, req.session, function(err) {
                        var redisClient = null;
                        if(err) {
                            console.log('sessionstore set sid, sess', err);
                        }else {
                            res.send(buf);
                            redisClient = redis.createClient();
                            redisClient.setex(req.sessionID + codes, 300, "1", function(err) {
                                    if(err) {
                                        console.log('redis setex sid + codes', err);
                                    }
                                    redisClient.quit();
                                }
                            );
                        }
                    });
                }
            });
    });
    
};
