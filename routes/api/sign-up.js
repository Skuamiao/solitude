module.exports = function(api) {
    var vaii = require('validator'),
        redis = require('redis');
    api.route('/sign-up').post(
        require('body-parser').urlencoded({ extended: false }), 
        function(req, res) {
            console.log('req.body', req.body);
            var come = req.body,
                sc = req.signedCookies['_^'],
                go = {
                    status: true,
                    message: '注册成功',
                    body: null
                },
                msgbuf = [],
                redisClient = null;

            come.email = come.email.trim();
            come.nickname = come.nickname.trim();

            if(!sc) {
                go.status = false;
                msgbuf.push('验证码已失效');
            }else {
                if(!vaii.isEmail(come.email)) {
                    go.status = false;
                    msgbuf.push('邮箱不正确');
                }
                if(!vaii.isLength(come.pwd, 8, 16)) {
                    go.status = false;
                    msgbuf.push('密码不正确');
                }
                if(!vaii.isLength(come.repwd, 8, 16) || come.pwd !== come.repwd) {
                    go.status = false;
                    msgbuf.push('确认密码不一致');
                }
                if(!(vaii.isNumeric(come.v) && vaii.isLength(come.v, 4, 4))) {
                    go.status = false;
                    msgbuf.push('验证码不正确');
                }
            }

            if(!go.status) {
                go.message = msgbuf.join('；');
                res.status(200).json(go);
                return;
            }

            redisClient = redis.createClient();
            redisClient.mget(["sess:" + sc, sc + come.v], function(err, reply) {
                if(err) throw err;
                if(!(reply[0] && reply[1])) {
                    go.status = false;
                    go.message = '验证码已失效';
                    res.status(200).json(go);
                    redisClient.quit();
                }else {
                    redisClient.del('sess:' + sc, sc + come.v, function(err, reply) {
                        if(err) throw err;
                        res.status(200).json(go);
                        console.log('redis del', reply);
                        redisClient.quit();
                    });
                }
            });
            /*
                email: emailVal,
                nickname: nickNameVal,
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
