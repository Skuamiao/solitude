var jq = require('../assets/scripts/jquery'),
    React = require('react'),
    Email = require('./sign-up/email.jsx'),
    Nickname = require('./sign-up/nickname.jsx'),
    Pwd = require('./sign-up/pwd.jsx'),
    RePwd = require('./sign-up/rePwd.jsx'),
    Verification = require('./sign-up/verification.jsx'),
    Btn = require('./sign-up/btn.jsx'),
    Form = React.createClass({
        getPwdInfo: function() {
            var state = this.refs.pwd.state;
            return {
                status: state.status,
                value: state.value
            }
        },
        click: function(evt) {
            evt.preventDefault();
            var self = this;
            
            var email = this.refs.email,
                pwd = this.refs.pwd,
                rePwd = this.refs.rePwd,
                verification = this.refs.verification,
                btn = this.refs.btn,
                emailVal = email.state.value.trim(),
                nicknameVal = this.refs.nickname.state.value.trim(),
                pwdVal = pwd.state.value,
                rePwdVal = rePwd.state.value,
                verificationVal = verification.state.value.trim(),
                errs = 0;

            if(btn.state.signUping) return;

            if(email.state.status < 1) {
                if(email.state.status === 0) email.setState({status: -1});
                errs++
            }

            if(pwd.state.status < 1) {
                if(pwd.state.status === 0) pwd.setState({status: -1});
                errs++;
            }

            if(rePwd.state.status < 1) {
                if(rePwd.state.status === 0) rePwd.setState({status: -1});
                errs++;
            }

            if(verification.state.status < 1) {
                if(verification.state.status === 0) verification.setState({status: -1});
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
                    verification: verificationVal
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
        },
        render: function() {
            var rePwdPack = {
                    getRefInfo: this.getPwdInfo
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
