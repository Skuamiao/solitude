var jq = require('../assets/scripts/jquery'),
    React = require('react'),
    Email = require('./sign-up/email.jsx'),
    NickName = require('./sign-up/nickName.jsx'),
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
                emailVal = email.getVal(),
                nickNameVal = this.refs.nickName.getVal(),
                pwdVal = pwd.getVal(),
                rePwdVal = rePwd.getVal(),
                verificationVal = verification.getVal(),
                errs = 0;
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
            jq.post(
                '/api/sign-up',
                {
                    emailVal: emailVal,
                    nickNameVal: nickNameVal,
                    pwdVal: pwdVal,
                    rePwdVal: rePwdVal,
                    verificationVal: verificationVal
                },
                function(data) {
                    console.log(data);
                }
            )
            console.log({
                emailVal: emailVal,
                nickNameVal: nickNameVal,
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
                    <NickName ref='nickName' />
                    <Pwd ref='pwd' />
                    <RePwd pack={rePwdPack} ref='rePwd' />
                    <Verification ref='verification' />
                    <Btn pack={submitPack} />
                </form>
            );
        }
    });
    
module.exports = Form;
