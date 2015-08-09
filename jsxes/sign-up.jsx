var React = require('react'),
    Form = React.createClass({
        render: function() {
            return (
                <form className='form-sign-up col-sm-6 col-sm-offset-3 form-horizontal'>
                    <h1 className='col-sm-8 col-sm-offset-4 text-center'>注册</h1>
                    <div className='form-group-lg has-feedback'>
                        <label className='col-sm-4 control-label' htmlFor='email'>Email</label>
                        <div className='col-sm-8'>
                            <input className='form-control' type='email' id='email' placeholder='Email' />
                            <span className="glyphicon glyphicon-remove form-control-feedback invisible" aria-hidden="true"></span>
                        </div>
                        <div className='col-sm-8 col-sm-offset-4 invisible'>
                            <p className='text-warning tip'>如果你错了，请纠正</p>
                        </div>
                    </div>
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
                    <div className='form-group-lg has-feedback'>
                        <label className='col-sm-4 control-label' htmlFor='pwd2'>密码</label>
                        <div className='col-sm-8'>
                            <input className='form-control' type='password' id='pwd2' placeholder='确认密码' />
                            <span className="glyphicon glyphicon-remove form-control-feedback invisible" aria-hidden="true"></span>
                        </div>
                        <div className='col-sm-8 col-sm-offset-4 invisible'>
                            <p className='text-warning tip'>如果你错了，请纠正</p>
                        </div>
                    </div>
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
                    <div className='col-sm-offset-4 col-sm-8'>
                        <input className='btn btn-default btn-lg btn-block' type='submit' value='注册' />
                    </div>
                </form>
            );
        }
    });

module.exports = Form;
