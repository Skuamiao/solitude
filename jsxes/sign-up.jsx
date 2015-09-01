var React = require('react'),
    // jq = require('../assets/scripts/jquery'),
    vaii = require('validator'),
    Email = React.createClass({
        getInitialState: function() {
            return {

            };
        },
        componentDidMount: function() {
            
        },
        blur: function(evt) {

        },
        change: function(evt) {

        },
        render: function() {
            return (
                <div className='form-group form-group-lg has-feedback has-error'>
                    <label className='control-label col-sm-4' htmlFor='email'>Email</label>
                    <div className='col-sm-8'>
                        <input className='form-control' type='email' id='email' placeholder='如 a@bc.de' />
                        <span className="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
                    </div>
                    <p className='col-sm-offset-4 col-sm-8 i-tip text-danger'>
                        请输入正确的邮箱
                    </p>
                </div>
            );
        }
    }),
    NickName = React.createClass({
        render: function() {
            return (
                <div className='form-group form-group-lg nickname-row'>
                    <label className='control-label col-sm-4' htmlFor='nick-name'>称号</label>
                    <div className='col-sm-8'>
                        <input className='form-control' type='text' id='nick-name' placeholder='称号或留空' />
                    </div>
                </div>
            );
        }
    }),
    Pwd = React.createClass({
        getInitialState: function() {
            return {

            };
        },
        componentDidMount: function() {
            
        },
        blur: function(evt) {

        },
        change: function(evt) {

        },
        render: function () {
            return (
                <div className='form-group form-group-lg has-feedback has-error'>
                    <label className='control-label col-sm-4' htmlFor='pwd'>密码</label>
                    <div className='col-sm-8'>
                        <input className='form-control' type='password' id='pwd' placeholder='8 - 16 位密码' />
                        <span className='glyphicon glyphicon-remove form-control-feedback' aria-hidden='true'></span>
                    </div>
                    <p className='col-sm-offset-4 col-sm-8 i-tip text-danger'>请输入 8 - 16 位密码</p>
                </div>
            );
        }
    }),
    RePwd = React.createClass({
        getInitialState: function() {
            return {

            };
        },
        componentDidMount: function() {
            
        },
        blur: function(evt) {
            
        },
        change: function(evt) {
            
        },
        render: function () {
            return (
                <div className='form-group form-group-lg has-feedback has-error'>
                    <label className='control-label col-sm-4' htmlFor='re-pwd'>确认密码</label>
                    <div className='col-sm-8'>
                        <input className='form-control' type='password' id='re-pwd' placeholder='确认密码' />
                        <span className='glyphicon glyphicon-remove form-control-feedback' aria-hidden='true'></span>
                    </div>
                    <p className='col-sm-offset-4 col-sm-8 i-tip text-danger'>请保证两次输入的密码一致</p>
                </div>
            );
        }
    }),
    Verification = React.createClass({
        getInitialState: function() {
            return {
                
            };
        },
        componentDidMount: function() {
            
        },
        blur: function(evt) {
            
        },
        change: function(evt) {
            
        },
        render: function() {
            return (
                <div className='form-group form-group-lg has-feedback has-error'>
                    <label className='control-label col-xs-12 col-sm-4' htmlFor='verification'>验证码</label>
                    <div className='col-xs-8 col-sm-5'>
                        <input className='form-control' type='text' id='verification' placeholder='验证码' />
                        <span className='glyphicon glyphicon-remove form-control-feedback ' aria-hidden='true'></span>
                    </div>
                    <img className='verification col-xs-4 col-sm-3' src='/assets/1234.png' />
                    <p className='col-sm-offset-4 col-sm-8 i-tip text-danger'>请输入 4 位验证码</p>
                </div>
            );
        }
    }),
    Btn = React.createClass({
        getInitialState: function() {
            return {
                
            };
        },
        click: function(evt) {
            
        },
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
        render: function() {
            return (
                <form noValidate className='i-form col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6 col-lg-offset-4 col-lg-4 form-horizontal'>
                    <h1 className='text-center'>注册</h1>
                    <Email />
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
