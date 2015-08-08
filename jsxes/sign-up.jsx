var React = require('react'),
    Form = React.createClass({
        render: function() {
            return (
                <form className='form-sign-up col-sm-6 col-sm-offset-3 form-horizontal'>
                    <h1 className='col-sm-8 col-sm-offset-4 text-center'>注册</h1>
                    <div className='form-group'>
                        <label className='col-sm-4 control-label' htmlFor='email'>Email</label>
                        <div className='col-sm-8'>
                            <input className='form-control input-lg' type='email' id='email' placeholder='Email' />
                        </div>
                    </div>
                    <div className='form-group'>
                        <label className='col-sm-4 control-label' htmlFor='pwd'>密码</label>
                        <div className='col-sm-8'>
                            <input className='form-control input-lg' type='password' id='pwd' placeholder='输入密码' />
                        </div>
                    </div>
                    <div className='form-group'>
                        <label className='col-sm-4 control-label' htmlFor='pwd2'>密码</label>
                        <div className='col-sm-8'>
                            <input className='form-control input-lg' type='password' id='pwd2' placeholder='确认密码' />
                        </div>
                    </div>
                    <div className='form-group'>
                        <label className='col-sm-4 control-label' htmlFor='code'>验证码</label>
                        <div className='col-sm-8'>
                            <input className='form-control input-lg' type='text' id='code' placeholder='输入验证码' />
                        </div>
                    </div>
                    <div className='form-group'>
                        <div className='col-sm-offset-4 col-sm-8'>
                            <input className='btn btn-default btb-lg btn-block' type='submit' value='注册' />
                        </div>
                    </div>
                </form>
            );
        }
    });

module.exports = Form;
