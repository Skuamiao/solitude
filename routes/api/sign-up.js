module.exports = function(api) {
    var vaii = require('validator'),
        redis = require('redis');
    api.route('/sign-up').post(
        require('body-parser').urlencoded({ extended: false }), 
        function(req, res) {
            console.log(req.body);
            var data = req.body,
                status = true,
                message = "注册成功",
                redisClient = null;

            if(!vaii.isEmail(data.email.trim())) {
                status = false;
                message = "邮箱不正确";
            }else if(!vaii.isLength(data.pwd, 8, 16)) {
                status = false;
                message = "密码不正确";
            }else if(!vaii.isLength(data.repwd, 8, 16) || data.pwd !== data.repwd) {
                status = false;
                message = "密码不一致";
            }else if(!(vaii.isNumeric(data.v) && vaii.isLength(data.v, 4, 4))) {
                status = false;
                message = "验证码不正确";
            }
            redisClient = redis.createClient();
            redisClient.get("sess:" + req.signedCookies['_^'], function(err, reply) {
                if(err) throw err;
                if(reply) {
                    redisClient.get(req.signedCookies['_^'] + data.v, function(err, reply) {
                        if(err) throw err;
                        if(reply) {
                            res.status(200).json({
                                status: status,
                                message: message,
                                body: null
                            });
                        }else {
                            res.status(200).json({
                                status: false,
                                message: "验证码已失效",
                                body: null
                            });
                        }
                        redisClient.quit();
                    });
                }else {
                    res.status(200).json({
                        status: false,
                        message: "验证码已失效",
                        body: null
                    });
                }
                redisClient.quit();
            });
            /*
                email: emailVal,
                name: nickNameVal,
                pwd: pwdVal,
                repwd: rePwdVal,
                v: verificationVal
            */
        }
    );
};

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