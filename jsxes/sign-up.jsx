var React = require('react'),
    jq = require('../assets/scripts/jquery'),
    vaii = require('validator'),
    Email = React.createClass({
        getInitialState: function() {
            return {};
        },
        componentDidMount: function() {
        },
        blur: function(evt) {
            var target = evt.target,
                val = target.value.trim();
            if(val) {
                console.log(vaii.isEmail(val));
            }else {
                console.log(val);
            }
        },
        render: function() {
            return (
                <div className='form-group-lg has-feedback'>
                    <label className='col-sm-4 control-label' htmlFor='email'>Email</label>
                    <div className='col-sm-8'>
                        <input onBlur={this.blur} className='form-control' type='email' id='email' placeholder='如 one@where.com' />
                        <span className="glyphicon glyphicon-remove form-control-feedback invisible" aria-hidden="true"></span>
                    </div>
                    <div className='col-sm-8 col-sm-offset-4 invisible'>
                        <p className='text-warning tip'>如果你错了，请纠正</p>
                    </div>
                </div>
            );
        }
    }),
    Pwd = React.createClass({
        render: function () {
            return (
                <div className='form-group-lg has-feedback'>
                    <label className='col-sm-4 control-label' htmlFor='pwd'>密码</label>
                    <div className='col-sm-8'>
                        <input className='form-control' type='password' id='pwd' placeholder='输入密码' />
                        <span className="glyphicon glyphicon-remove form-control-feedback invisible" aria-hidden="true"></span>
                    </div>
                    <div className='col-sm-8 col-sm-offset-4 invisible'>
                        <p className='text-warning tip'>如果你错了，请纠正</p>
                    </div>
                </div>
            );
        }
    }),
    RePwd = React.createClass({
        render: function () {
            return (
                <div className='form-group-lg has-feedback'>
                    <label className='col-sm-4 control-label' htmlFor='re-pwd'>密码</label>
                    <div className='col-sm-8'>
                        <input className='form-control' type='password' id='re-pwd' placeholder='确认密码' />
                        <span className="glyphicon glyphicon-remove form-control-feedback invisible" aria-hidden="true"></span>
                    </div>
                    <div className='col-sm-8 col-sm-offset-4 invisible'>
                        <p className='text-warning tip'>如果你错了，请纠正</p>
                    </div>
                </div>
            );
        }
    }),
    Verification = React.createClass({
        render: function() {
            return (
                <div className='form-group-lg has-feedback'>
                    <label className='col-sm-4 control-label' htmlFor='code'>验证码</label>
                    <div className='col-sm-8'>
                        <input className='form-control' type='text' id='code' placeholder='输入验证码' />
                        <span className="glyphicon glyphicon-remove form-control-feedback invisible" aria-hidden="true"></span>
                    </div>
                    <div className='col-sm-8 col-sm-offset-4 invisible'>
                        <p className='text-warning tip'>如果你错了，请纠正</p>
                    </div>
                </div>
            );
        }
    }),
    Btn = React.createClass({
        render: function () {
            return (
                <div className='col-sm-offset-4 col-sm-8'>
                    <input className='btn btn-default btn-lg btn-block' type='submit' value='注册' />
                </div>
            );
        }
    }),
    Form = React.createClass({
        render: function() {
            return (
                <form noValidate className='form-sign-up col-sm-8 col-sm-offset-2 form-horizontal'>
                    <h1 className='col-sm-8 col-sm-offset-4 text-center'>注册</h1>
                    <Email />
                    <Pwd />
                    <RePwd />
                    <Verification />
                    <Btn />
                </form>
            );
        }
    });
module.exports = Form;

/*
{
    emailTip: '请输入正确的邮箱',
    pwdTip: '请输入 8-16 位密码',
    rePwdTip: '请保证两次输入的密码一致',
    verifyTip: '请输入验证码'
}
*/
