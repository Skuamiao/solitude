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
                passed: this.props.passed,
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
                this.setState({passed: false, isEmpty: true});
            }else {
                if(!vaii.isEmail(val)) {
                    this.setState({passed: false, isEmpty: false});
                }
            }
        },
        change: function(evt) {
            var val = evt.target.value;
            this.setState({value: val});
            if(vaii.isEmail(val)) {
                this.setState({passed: true, isEmpty: false});
            }
        },
        render: function() {
            var passed = this.state.passed,
                isEmpty = this.state.isEmpty,
                hasError = '',
                invisible = 'invisible';

            if(!(passed || isEmpty)) {
                hasError = 'has-error';
                invisible = '';
            }
            return (
                <div className={'form-group form-group-lg ' + hasError}>
                    <label className='control-label col-sm-2' htmlFor='email'>Email</label>
                    <div className='col-sm-10'>
                        <input ref='email' onBlur={this.blur} onChange={this.change} value={this.state.value} className='form-control' type='email' id='email' placeholder='如 one@where.com' />
                    </div>
                    <p className={'col-sm-offset-2 col-sm-10 i-tip .' + invisible}>
                        请输入正确的邮箱
                    </p>
                </div>
            );
        }
    }),
    NickName = React.createClass({
        render: function() {
            return (
                <div className='form-group-lg row nick-name-row'>
                    <label className='col-sm-4 control-label' htmlFor='nick-name'>昵称</label>
                    <div className='col-sm-8'>
                        <input className='form-control' type='text' id='nick-name' placeholder='留空或输入昵称，如“贝贝”' />
                    </div>
                </div>
            );
        }
    }),
    Pwd = React.createClass({
        getInitialState: function() {
            return {
                passed: this.props.passed,
                isEmpty: true,
                value: ''
            };
        },
        componentDidMount: function() {
            thatPwd = this;
        },
        blur: function(evt) {
            var target = evt.target,
                val = target.value;
            if(val.length < 1) {
                this.setState({passed: false, isEmpty: true});
            }else {
                if(!vaii.isLength(val, 8, 16)) {
                    this.setState({passed: false, isEmpty: false});
                }
            }
        },
        change: function(evt) {
            var val = evt.target.value;
            this.setState({value: val});
            if(vaii.isLength(val, 8, 16)) {
                this.setState({passed: true, isEmpty: false});
            }
        },
        render: function () {
            var passed = this.state.passed,
                isEmpty = this.state.isEmpty,
                hasError = '',
                invisible = 'invisible';

            if(!(passed || isEmpty)) {
                hasError = 'has-error';
                invisible = '';
            }

            return (
                <div className={'form-group-lg has-feedback row ' + hasError}>
                    <label className='col-sm-4 control-label' htmlFor='pwd'>密码</label>
                    <div className='col-sm-8'>
                        <input ref='pwd' onBlur={this.blur} onChange={this.change} value={this.state.value} className='form-control' type='password' id='pwd' placeholder='输入 8 - 16 位密码' />
                        <span className={'glyphicon glyphicon-remove form-control-feedback ' + invisible} aria-hidden='true'></span>
                    </div>
                    <div className={'col-sm-8 col-sm-offset-4 ' + invisible}>
                        <p className='text-warning tip'>输入 8 - 16 位密码</p>
                    </div>
                </div>
            );
        }
    }),
    RePwd = React.createClass({
        getInitialState: function() {
            return {
                passed: this.props.passed,
                isEmpty: true,
                value: ''
            };
        },
        componentDidMount: function() {
            thatRePwd = this;
        },
        blur: function(evt) {
            var target = evt.target,
                val = target.value,
                refVal = thatPwd.refs.pwd.getDOMNode().value;
            if(vaii.isLength(refVal, 8, 16)) {
                if(val.length < 1) {
                    this.setState({passed: false, isEmpty: true});
                }else {
                    if(!vaii.equals(val, refVal)) {
                        this.setState({passed: false, isEmpty: false});
                    }
                }
            }else {
                this.setState({passed: false, isEmpty: true});
            }
        },
        change: function(evt) {
            var val = evt.target.value,
                refVal = thatPwd.refs.pwd.getDOMNode().value;
            this.setState({value: val});
            if(vaii.isLength(refVal, 8, 16) && refVal === val) {
                this.setState({passed: true, isEmpty: false});
            }
        },
        render: function () {
            var passed = this.state.passed,
                isEmpty = this.state.isEmpty,
                hasError = '',
                invisible = 'invisible';

            if(!(passed || isEmpty)) {
                hasError = 'has-error';
                invisible = '';
            }
            return (
                <div className={'form-group-lg has-feedback row ' + hasError}>
                    <label className='col-sm-4 control-label' htmlFor='re-pwd'>确认密码</label>
                    <div className='col-sm-8'>
                        <input ref='repwd' onBlur={this.blur} onChange={this.change} value={this.state.value} className='form-control' type='password' id='re-pwd' placeholder='确认密码' />
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
                passed: this.props.passed,
                isEmpty: true,
                value: ''
            };
        },
        componentDidMount: function() {
            thatCode = this;
        },
        blur: function(evt) {
            var target = evt.target,
                val = target.value.trim();
            if(val.length < 1) {
                this.setState({passed: false, isEmpty: true});
            }else {
                if(!(vaii.isNumeric(val) && vaii.isLength(val, 4, 4))) {
                    this.setState({passed: false, isEmpty: false});
                }
            }
        },
        change: function(evt) {
            var val = evt.target.value;
            this.setState({value: val});
            val = val.trim();
            if(vaii.isNumeric(val) && vaii.isLength(val, 4, 4)) {
                this.setState({passed: true, isEmpty: false});
            }
        },
        render: function() {
            var passed = this.state.passed,
                isEmpty = this.state.isEmpty,
                hasError = '',
                invisible = 'invisible';

            if(!(passed || isEmpty)) {
                hasError = 'has-error';
                invisible = '';
            }
            return (
                <div className={'form-group-lg has-feedback row ' + hasError}>
                    <label className='col-xs-12 col-sm-4 control-label' htmlFor='code'>验证码</label>
                    <div className='col-xs-12 col-sm-8 row'>
                        <div className='col-xs-8'>
                            <input ref='code' onBlur={this.blur} onChange={this.change} value={this.state.value} className='form-control' type='text' id='code' placeholder='输入验证码' />
                            <span className={'glyphicon glyphicon-remove form-control-feedback ' + invisible} aria-hidden='true'></span>
                        </div>
                        <div className='col-xs-4'><img className='code' src='/assets/1234.png' /></div>
                    </div>
                    <div className={'col-xs-12 col-sm-8 col-sm-offset-4 ' + invisible}>
                        <p className='text-warning tip'>请输入 4 位验证码</p>
                    </div>
                </div>
            );
        }
    }),
    Btn = React.createClass({
        getInitialState: function() {
            return {
                submitShould: this.props.submitShould
            };
        },
        click: function(evt) {
            evt.preventDefault();
            if(this.state.submitShould) return;
            var flag = 0,
                email = thatEmail.refs.email.getDOMNode(),
                pwd = thatPwd.refs.pwd.getDOMNode(),
                rePwd = thatRePwd.refs.repwd.getDOMNode(),
                code = thatCode.refs.code.getDOMNode();

            if(!vaii.isEmail(email.value.trim())) {
                thatEmail.setState({passed: false, isEmpty: false});
                // ifocus(email);
                flag++;
            }

            if(!vaii.isLength(pwd.value, 8, 16)) {
                thatPwd.setState({passed: false, isEmpty: false});
                // ifocus(pwd);
                flag++;
            }

            if(!(vaii.isLength(rePwd.value, 8, 16) && vaii.equals(rePwd.value, pwd.value))) {
                thatRePwd.setState({passed: false, isEmpty: false});
                // ifocus(rePwd);
                flag++;
            }

            if(!(vaii.isNumeric(code.value) && vaii.isLength(code.value, 4, 4))) {
                thatCode.setState({passed: false, isEmpty: false});
                // ifocus(code);
                flag++;
            }

            if(flag) return;

            this.setState({submitShould: true});
        },
        render: function () {
            return (
                <div className='row'>
                    <div className='col-sm-offset-4 col-sm-8'>
                        <input onClick={this.click} className='btn btn-primary btn-lg btn-block' type='submit' value={this.state.submitShould ? '注册中...' : '注册'} />
                    </div>
                </div>
            );
        }
    }),
    Form = React.createClass({
        render: function() {
            return (
                <form noValidate className='i-form col-sm-offset-2 col-sm-8 form-horizontal'>
                    <div className=''>
                        <h1 className=''>注册</h1>
                    </div>
                    <Email passed={this.props.emailPassed} />
                    <NickName />
                    <Pwd passed={this.props.pwdPassed} />
                    <RePwd passed={this.props.rePwdPassed} />
                    <Verification passed={this.props.codePassed} />
                    <Btn submitShould={this.props.submitShould} />
                </form>
            );
        }
    });
    React.initializeTouchEvents(true);
module.exports = Form;
