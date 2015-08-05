var React = require('react'),
    Form = React.createClass({
        render: function() {
            return (
                <form>
                    <div>
                        <label htmlFor='email'>email</label>
                        <input type='email' id='email' placeholder='输入邮箱' />
                    </div>
                    <div>
                        <label htmlFor='pwd'>密码</label>
                        <input type='password' id='pwd' placeholder='输入密码' />
                    </div>
                    <div>
                        <label htmlFor='pwd2'>密码</label>
                        <input type='password' id='pwd2' placeholder='确认密码' />
                    </div>
                    <div>
                        <label htmlFor='code'>验证码</label>
                        <input type='text' id='code' placeholder='输入验证码' />
                    </div>
                    <input type='submit' value='注册' />
                </form>
            );
        }
    });

module.exports = Form;
