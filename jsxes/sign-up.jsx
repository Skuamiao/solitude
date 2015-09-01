var React = require('react'),
    // jq = require('../assets/scripts/jquery'),
    vaii = require('validator'),
    thatPwd = null,
    Email = React.createClass({
        getInitialState: function() {
            return  {
                value: this.props.it.state.emailValue,
                check: this.props.it.state.checkEmail,
                err: this.props.it.state.emailErr
            }
        },
        componentDidMount: function() {
            
        },
        focus: function(evt) {
            if(this.state.err) {
                this.setState({err: false});
            }
        },
        blur: function(evt) {
            var val = this.state.value.trim();
            if(val && !this.state.check(val)) {
                this.setState({err: true});
            }
        },
        change: function(evt) {
            this.setState({value: evt.target.value});
        },
        render: function() {
            var errCN = this.state.err ? 'has-error': '';
            return (
                <div className={'form-group form-group-lg has-feedback ' + errCN}>
                    <label className='control-label col-sm-4' htmlFor='email'>Email</label>
                    <div className='col-sm-8'>
                        <input className='form-control' type='email' id='email' placeholder='如 a@bc.de' onChange={this.change} onFocus={this.focus} onBlur={this.blur} value={this.state.value} />
                        <span className="glyphicon glyphicon-remove form-control-feedback i-icon" aria-hidden="true"></span>
                    </div>
                    <p className='col-sm-offset-4 col-sm-8 text-danger i-tip'>
                        请输入正确的邮箱
                    </p>
                </div>
            );
        }
    }),
    NickName = React.createClass({
        getVal: function() {
            return this.state.value.trim();
        },
        getInitialState: function() {
            return {
                value: ''
            };
        },
        componentDidMount: function() {
            
        },
        change: function(evt) {
            this.setState({value: evt.target.value});
        },
        render: function() {
            return (
                <div className='form-group form-group-lg nickname-row'>
                    <label className='control-label col-sm-4' htmlFor='nick-name'>称号</label>
                    <div className='col-sm-8'>
                        <input className='form-control' type='text' id='nick-name' placeholder='称号或留空' onChange={this.change} value={this.state.value} />
                    </div>
                </div>
            );
        }
    }),
    Pwd = React.createClass({
        getVal: function() {
            return this.state.value;
        },
        getInitialState: function() {
            return {
                err: false,
                value: ''
            };
        },
        componentDidMount: function() {
            thatPwd = this;
        },
        focus: function(evt) {
            if(this.state.err) {
                this.setState({err: false});
            }
        },
        blur: function(evt) {
            var val = this.state.value;
            if(val && !vaii.isLength(val, 8, 16)) {
                this.setState({err: true});
            }
        },
        change: function(evt) {
            this.setState({value: evt.target.value});
        },
        render: function () {
            var errCN = this.state.err ? 'has-error': '';
            return (
                <div className={'form-group form-group-lg has-feedback ' + errCN}>
                    <label className='control-label col-sm-4' htmlFor='pwd'>密码</label>
                    <div className='col-sm-8'>
                        <input className='form-control' type='password' id='pwd' placeholder='8 - 16 位密码' onFocus={this.focus} onBlur={this.blur} onChange={this.change} value={this.state.value} />
                        <span className='glyphicon glyphicon-remove form-control-feedback i-icon' aria-hidden='true'></span>
                    </div>
                    <p className='col-sm-offset-4 col-sm-8 i-tip text-danger'>请输入 8 - 16 位密码</p>
                </div>
            );
        }
    }),
    RePwd = React.createClass({
        getVal: function() {
            return this.state.value;
        },
        getInitialState: function() {
            return {
                err: false,
                value: ''
            };
        },
        componentDidMount: function() {
            
        },
        focus: function(evt) {
            if(this.state.err) {
                this.setState({err: false});
            }
        },
        blur: function(evt) {
            var val = this.state.value,
                refVal = thatPwd.getVal();
            console.log(vaii.isLength(refVal, 8, 16), val, !vaii.equals(val, refVal));
            if(vaii.isLength(refVal, 8, 16) && val && !vaii.equals(val, refVal)) {
                this.setState({err: true});
            }
        },
        change: function(evt) {
            this.setState({value: evt.target.value});
        },
        render: function () {
            var errCN = this.state.err ? 'has-error': '';
            return (
                <div className={'form-group form-group-lg has-feedback ' + errCN}>
                    <label className='control-label col-sm-4' htmlFor='re-pwd'>确认密码</label>
                    <div className='col-sm-8'>
                        <input className='form-control' type='password' id='re-pwd' onFocus={this.focus} onBlur={this.blur} onChange={this.change} value={this.state.value} placeholder='确认密码' />
                        <span className='glyphicon glyphicon-remove form-control-feedback i-icon' aria-hidden='true'></span>
                    </div>
                    <p className='col-sm-offset-4 col-sm-8 i-tip text-danger'>请保证两次输入的密码一致</p>
                </div>
            );
        }
    }),
    Verification = React.createClass({
        getVal: function() {
            return this.state.value.trim();
        },
        getInitialState: function() {
            return {
                err: false,
                value: ''
            };
        },
        componentDidMount: function() {
            
        },
        focus: function(evt) {
            if(this.state.err) {
                this.setState({err: false});
            }
        },
        blur: function(evt) {
            var val = this.state.value.trim();
            if(val && !(vaii.isNumeric(val) && vaii.isLength(val, 4, 4))) {
                this.setState({err: true});
            }
        },
        change: function(evt) {
            this.setState({value: evt.target.value});
        },
        render: function() {
            var errCN = this.state.err ? 'has-error': '';
            return (
                <div className={'form-group form-group-lg has-feedback ' + errCN}>
                    <label className='control-label col-xs-12 col-sm-4' htmlFor='verification'>验证码</label>
                    <div className='col-xs-8 col-sm-5'>
                        <input className='form-control' type='text' id='verification' onFocus={this.focus} onBlur={this.blur} onChange={this.change} value={this.state.value} placeholder='验证码' />
                        <span className='glyphicon glyphicon-remove form-control-feedback i-icon' aria-hidden='true'></span>
                    </div>
                    <img className='verification col-xs-4 col-sm-3' src='/assets/1234.png' />
                    <p className='col-sm-offset-4 col-sm-8 i-tip text-danger'>请输入 4 位验证码</p>
                </div>
            );
        }
    }),
    Btn = React.createClass({
        render: function () {
            return (
                <div className='form-group form-group-lg'>
                    <div className="col-sm-offset-4 col-sm-8">
                        <input className='btn btn-primary btn-lg' type='submit' value='提交' />
                    </div>
                </div>
            );
        }
    }),
    Form = React.createClass({
        getInitialState: function() {
            return {
                emailErr: false,
                emailValue: '',
                checkEmail: function(val) {
                    return vaii.isEmail(val);
                }
            };
        },
        render: function() {
            return (
                <form noValidate className='i-form col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6 col-lg-offset-4 col-lg-4 form-horizontal'>
                    <h1 className='text-center'>注册</h1>
                    <Email it={this} />
                    <NickName />
                    <Pwd />
                    <RePwd />
                    <Verification />
                    <Btn />
                </form>
            );
        }
    });
    React.initializeTouchEvents(true);
module.exports = Form;
