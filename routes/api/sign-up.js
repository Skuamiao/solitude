module.exports = function(api) {

    function validate(req, res, next) {
        console.log('req.body', req.body);
        var come = req.body,
            sc = req.signedCookies['_^'],
            go = {
                status: true,
                message: '注册成功',
                body: null
            },
            msgbuf = [],
            vaii = require('validator');

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
            if(come.nickname.length > 28) {
                go.status = false;
                msgbuf.push('昵称太长');
            }
            if(!vaii.isLength(come.pwd, 8, 16)) {
                go.status = false;
                msgbuf.push('密码不正确');
            }
            if(!vaii.isLength(come.repwd, 8, 16) || come.pwd !== come.repwd) {
                go.status = false;
                msgbuf.push('确认密码不一致');
            }
            if(!(vaii.isNumeric(come.verification) && vaii.isLength(come.verification, 4, 4))) {
                go.status = false;
                msgbuf.push('验证码不正确');
            }
        }

        if(!go.status) {
            go.message = msgbuf.join('；');
            res.status(200).json(go);
            console.log('validate failed', go);
        }else {
            res.locals.sc = sc;
            res.locals.come = come;
            res.locals.go = go;
            next();
        }
    }

    function match(req, res, next) {
        var sc = res.locals.sc,
            go = res.locals.go,
            come = res.locals.come,
            redisClient = require('redis').createClient();

        redisClient.mget(["sess:" + sc, sc + come.verification], function(err, reply) {
            if(err) {
                console.log('redis mget err', err);
            }
            if(!(reply[0] && reply[1])) {
                go.status = false;
                go.message = '验证码已失效';
                res.status(200).json(go);
                redisClient.quit();
                console.log('redis mget failed', go);
            }else {
                redisClient.del('sess:' + sc, sc + come.verification, function(err, reply) {
                    if(err) {
                        console.log('redis del err', err);
                    }else {
                        next();
                    }
                    redisClient.quit();
                });
            }
        });
    }

    function save(req, res) {
        var come = res.locals.come,
            go = res.locals.go,
            pg = require('pg'),
            pgClient = new pg.Client('postgres://test:16d7a4fca7442dda3ad93c9a726597e4@localhost/dev');

        pgClient.connect(function(err) {
            if(err) {
                console.error('could not connect to pg', err);
            }else {
                pgClient.query(
                    'select sltd_author_add($1, $2, $3)', 
                    [come.email, require('../../utilities/icrypto').sha1(come.pwd), come.name || come.email], 
                    function(err, rt) {
                        if(err) {
                            console.error('error running query', err);
                        }
                        
                        if(rt.rows[0].sltd_author_add > 0) {
                            res.status(200).json(go);
                        }else {
                            go.status = false;
                            go.message = '邮箱或昵称已经存在';
                            res.status(200).json(go);
                            console.log('邮箱或昵称破坏 unique 约束');
                        }
                        
                        pgClient.end();
                    }
                );
            }
            
        });
    }

    /*
        cli.query(
            "select set_author($1, $2, $3)",
            [data.email, icrypto.sha1(data.pwd1), data.name],
            function(err, rows) {
                var mark = 0;
                if(err)
                    // todo something
                    throw err;
                else {
                    mark = rows[0].set_author;
                    if(mark > 0)
                        next();
                    else if(mark < 0)
                        throw new Error("诡异问题来临");
                    else {
                        local.data = {
                            succeeded: 0,
                            msg: "某些注册信息已存在"
                        };
                        res.status(200).type("html")
                                        .render("manager-sign-up", local);
                    }
                }
                cli.end();
            }
        );
    */

    api.route('/sign-up').post(
        require('body-parser').urlencoded({ extended: false }), 
        validate, 
        match, 
        save
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
