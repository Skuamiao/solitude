var jq = require('../assets/scripts/jquery'),
    React = require('react'),
    Email = require('./sign-up/email.jsx'),
    Nickname = require('./sign-up/nickname.jsx'),
    Pwd = require('./sign-up/pwd.jsx'),
    RePwd = require('./sign-up/rePwd.jsx'),
    Verification = require('./sign-up/verification.jsx'),
    Btn = require('./sign-up/btn.jsx'),
    Form = React.createClass({
        getPwdVal: function() {
            return this.refs.pwd.getVal();
        },
        click: function(evt) {
            evt.preventDefault();
            var email = this.refs.email,
                pwd = this.refs.pwd,
                rePwd = this.refs.rePwd,
                verification = this.refs.verification,
                btn = this.refs.btn,
                emailVal = email.getVal(),
                nicknameVal = this.refs.nickname.getVal(),
                pwdVal = pwd.getVal(),
                rePwdVal = rePwd.getVal(),
                verificationVal = verification.getVal(),
                errs = 0;

            if(btn.state.signUping) return;

            if(!email.check(emailVal)) {
                email.setState({err: true});
                errs++;
            }
            if(!pwd.check(pwdVal)) {
                pwd.setState({err: true});
                errs++;
            }
            if(!rePwd.check(rePwdVal, pwdVal)) {
                rePwd.setState({err: true});
                errs++;
            }
            if(!verification.check(verificationVal)) {
                verification.setState({err: true});
                errs++;
            }

            if(errs) return;

            btn.setState({signUping: 1});
            btn.setSignUpingVal();
            
            jq.ajax({
                url: '/api/sign-up',
                type: 'POST',
                data: {
                    email: emailVal,
                    nickname: nicknameVal,
                    pwd: pwdVal,
                    repwd: rePwdVal,
                    v: verificationVal
                },
                success: function(data) {
                    console.log(data);
                    btn.setState({signUping: 0});
                    btn.setDefaultVal();
                },
                complete: function() {
                    verification.updateImg();
                }
            })
            console.log({
                emailVal: emailVal,
                nicknameVal: nicknameVal,
                pwdVal: pwdVal,
                rePwdVal: rePwdVal,
                verificationVal: verificationVal
            });
        },
        render: function() {
            var rePwdPack = {
                    getRefVal: this.getPwdVal
                },
                submitPack = {
                    click: this.click
                };
            return (
                <form noValidate className='i-form col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6 col-lg-offset-4 col-lg-4 form-horizontal'>
                    <h1 className='text-center'>注册</h1>
                    <Email ref='email' />
                    <Nickname ref='nickname' />
                    <Pwd ref='pwd' />
                    <RePwd pack={rePwdPack} ref='rePwd' />
                    <Verification ref='verification' />
                    <Btn ref='btn' pack={submitPack} />
                </form>
            );
        }
    });
    
module.exports = Form;
