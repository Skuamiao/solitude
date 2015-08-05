'use strict';

var React = require('react'),
    Form = React.createClass({
    displayName: 'Form',

    render: function render() {
        return React.createElement(
            'form',
            null,
            React.createElement(
                'div',
                null,
                React.createElement(
                    'label',
                    { htmlFor: 'email' },
                    'email'
                ),
                React.createElement('input', { type: 'email', id: 'email', placeholder: '输入邮箱' })
            ),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'label',
                    { htmlFor: 'pwd' },
                    '密码'
                ),
                React.createElement('input', { type: 'password', id: 'pwd', placeholder: '输入密码' })
            ),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'label',
                    { htmlFor: 'pwd2' },
                    '密码'
                ),
                React.createElement('input', { type: 'password', id: 'pwd2', placeholder: '确认密码' })
            ),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'label',
                    { htmlFor: 'code' },
                    '验证码'
                ),
                React.createElement('input', { type: 'text', id: 'code', placeholder: '输入验证码' })
            ),
            React.createElement('input', { type: 'submit', value: '注册' })
        );
    }
});

module.exports = Form;