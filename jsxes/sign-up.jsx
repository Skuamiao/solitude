var React = require('react'),
    // jq = require('../assets/scripts/jquery'),
    vaii = require('validator'),
    thatEmail = null,
    thatPwd = null,
    thatRePwd = null,
    thatCode = null,
    Email = React.createClass({
        getInitialState: function() {
            return {
                flag: this.props.flag,
                isEmpty: true,
                value: ''
            };
        },
        componentDidMount: function() {
            thatEmail = this;
        },
        blur: function(evt) {
            var target = evt.target,
                val = target.value.trim();
            if(val.length < 1) {
                this.setState({flag: false, isEmpty: true});
            }else {
                if(vaii.isEmail(val)) {
                    this.setState({flag: true, isEmpty: false});
                }else {
                    this.setState({flag: false, isEmpty: false});
                    // target.focus();
                }
            }
        },
        change: function(evt) {
            this.setState({value: evt.target.value});
        },
        render: function() {
            var flag = this.state.flag,
                isEmpty = this.state.isEmpty,
                hasError = '',
                invisible = 'invisible';

            if(!(flag || isEmpty)) {
                hasError = 'has-error';
                invisible = '';
            }
            return (
                <div className={'form-group-lg has-feedback ' + hasError}>
                    <label className='col-sm-4 control-label' htmlFor='email'>Email</label>
                    <div className='col-sm-8'>
                        <input onBlur={this.blur} onChange={this.change} value={this.state.value} className='form-control' type='email' id='email' placeholder='如 one@where.com' />
                        <span className={'glyphicon glyphicon-remove form-control-feedback ' + invisible} aria-hidden='true'></span>
                    </div>
                    <div className={'col-sm-8 col-sm-offset-4 ' + invisible}>
                        <p className='text-warning tip'>请输入正确的邮箱</p>
                    </div>
                </div>
            );
        }
    }),
    Pwd = React.createClass({
        getInitialState: function() {
            return {
                flag: this.props.flag,
                value: '',
                isEmpty: true
            };
        },
        componentDidMount: function() {
            thatPwd = this;
        },
        blur: function(evt) {
            var target = evt.target,
                val = target.value;
            if(val.length < 1) {
                this.setState({flag: false, isEmpty: true});
            }else {
                if(vaii.isLength(val, 8, 16)) {
                    this.setState({flag: true, isEmpty: false});
                }else {
                    this.setState({flag: false, isEmpty: false});
                    // target.focus();
                }
            }
        },
        change: function(evt) {
            this.setState({value: evt.target.value});
        },
        render: function () {
            var flag = this.state.flag,
                isEmpty = this.state.isEmpty,
                hasError = '',
                invisible = 'invisible';

            if(!(flag || isEmpty)) {
                hasError = 'has-error';
                invisible = '';
            }

            return (
                <div className={'form-group-lg has-feedback ' + hasError}>
                    <label className='col-sm-4 control-label' htmlFor='pwd'>密码</label>
                    <div className='col-sm-8'>
                        <input onBlur={this.blur} onChange={this.change} value={this.state.value} className='form-control' type='password' id='pwd' placeholder='输入密码' />
                        <span className={'glyphicon glyphicon-remove form-control-feedback ' + invisible} aria-hidden='true'></span>
                    </div>
                    <div className={'col-sm-8 col-sm-offset-4 ' + invisible}>
                        <p className='text-warning tip'>请输入 8 - 16 位密码</p>
                    </div>
                </div>
            );
        }
    }),
    RePwd = React.createClass({
        getInitialState: function() {
            return {
                flag: this.props.flag,
                value: '',
                isEmpty: true
            };
        },
        componentDidMount: function() {
            thatRePwd = this;
        },
        blur: function(evt) {
            var target = evt.target,
                val = target.value,
                refVal = document.getElementById('pwd').value;
            if(vaii.isLength(refVal, 8, 16)) {
                if(val.length < 1) {
                    this.setState({flag: false, isEmpty: true});
                }else {
                    if(vaii.equals(val, refVal)) {
                        this.setState({flag: true, isEmpty: false});
                    }else {
                        this.setState({flag: false, isEmpty: false});
                        // target.focus();
                    }
                }
            }else {
                this.setState({flag: false, isEmpty: true});
            }
        },
        change: function(evt) {
            this.setState({value: evt.target.value});
        },
        render: function () {
            var flag = this.state.flag,
                isEmpty = this.state.isEmpty,
                hasError = '',
                invisible = 'invisible';

            if(!(flag || isEmpty)) {
                hasError = 'has-error';
                invisible = '';
            }
            return (
                <div className={'form-group-lg has-feedback ' + hasError}>
                    <label className='col-sm-4 control-label' htmlFor='re-pwd'>确认密码</label>
                    <div className='col-sm-8'>
                        <input onBlur={this.blur} onChange={this.change} value={this.state.value} className='form-control' type='password' id='re-pwd' placeholder='确认密码' />
                        <span className={'glyphicon glyphicon-remove form-control-feedback ' + invisible} aria-hidden='true'></span>
                    </div>
                    <div className={'col-sm-8 col-sm-offset-4 ' + invisible}>
                        <p className='text-warning tip'>请保证两次输入的密码一致</p>
                    </div>
                </div>
            );
        }
    }),
    Verification = React.createClass({
        getInitialState: function() {
            return {
                flag: this.props.flag,
                value: '',
                isEmpty: true
            };
        },
        componentDidMount: function() {
            thatCode = this;
        },
        blur: function(evt) {
            var target = evt.target,
                val = target.value;
            if(val.length < 1) {
                this.setState({flag: false, isEmpty: true});
            }else {
                if(vaii.isNumeric(val) && vaii.isLength(val, 4, 4)) {
                    this.setState({flag: true, isEmpty: false});
                }else {
                    this.setState({flag: false, isEmpty: false});
                    // target.focus();
                }
            }
        },
        change: function(evt) {
            this.setState({value: evt.target.value});
        },
        render: function() {
            var flag = this.state.flag,
                isEmpty = this.state.isEmpty,
                hasError = '',
                invisible = 'invisible';

            if(!(flag || isEmpty)) {
                hasError = 'has-error';
                invisible = '';
            }
            return (
                <div className={'form-group-lg has-feedback ' + hasError}>
                    <label className='col-sm-4 col-xs-12 control-label' htmlFor='code'>验证码</label>
                    <div className='col-xs-8 col-sm-5'>
                        <input onBlur={this.blur} onChange={this.change} value={this.state.value} className='form-control' type='text' id='code' placeholder='输入验证码' />
                        <span className={'glyphicon glyphicon-remove form-control-feedback ' + invisible} aria-hidden='true'></span>
                    </div>
                    <div className='col-xs-4 col-sm-3'><img className='code' src="/api/verify" /></div>
                    <div className={'col-sm-8 col-sm-offset-4 ' + invisible}>
                        <p className='text-warning tip'>请输入 4 位验证码</p>
                    </div>
                </div>
            );
        }
    }),
    Btn = React.createClass({
        getInitialState: function() {
            return {
                flag: this.props.flag
            };
        },
        click: function(evt) {
            evt.preventDefault();
            if(this.state.flag) return;
            var flag = 0,
                email = document.getElementById('email'),
                pwd = document.getElementById('pwd'),
                rePwd = document.getElementById('re-pwd'),
                code = document.getElementById('code'),
                pwdFlag = false,
                focusFlag = false;

            function ifocus(it) {
                if(!focusFlag) {
                    it.focus();
                    focusFlag = true;
                }
            }

            if(!vaii.isEmail(email.value.trim())) {
                thatEmail.setState({flag: false, isEmpty: false});
                ifocus(email);
                flag++;
            }

            if(!vaii.isLength(pwd.value, 8, 16)) {
                thatPwd.setState({flag: false, isEmpty: false});
                ifocus(pwd);
                flag++;
            }

            if(!(vaii.isLength(rePwd.value, 8, 16) && vaii.equals(rePwd.value, pwd.value))) {
                thatRePwd.setState({flag: false, isEmpty: false});
                ifocus(rePwd);
                flag++;
            }

            if(!(vaii.isNumeric(code.value) && vaii.isLength(code.value, 4, 4))) {
                thatCode.setState({flag: false, isEmpty: false});
                ifocus(code);
                flag++;
            }

            if(flag) return;

            this.setState({flag: true});
        },
        render: function () {
            return (
                <div className='col-sm-offset-4 col-sm-8'>
                    <input onClick={this.click} className='btn btn-default btn-lg btn-block' type='submit' value={this.state.flag ? '注册...' : '注册'} />
                </div>
            );
        }
    }),
    Form = React.createClass({
        render: function() {
            return (
                <form noValidate className='form-sign-up col-sm-8 col-sm-offset-2 form-horizontal'>
                    <h1 className='col-sm-8 col-sm-offset-4 text-center'>注册</h1>
                    <Email flag={this.props.emailFlag} />
                    <Pwd flag={this.props.pwdFlag} />
                    <RePwd flag={this.props.rePwdFlag} />
                    <Verification flag={this.props.codeFlag} />
                    <Btn flag={this.props.submitShould} />
                </form>
            );
        }
    });
module.exports = Form;
