'use strict';

var React = require('react'),
    Form = React.createClass({
    displayName: 'Form',

    render: function render() {
        return React.createElement(
            'form',
            { className: 'form-sign-up col-sm-6 col-sm-offset-3 form-horizontal' },
            React.createElement(
                'h1',
                { className: 'col-sm-8 col-sm-offset-4 text-center' },
                '注册'
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                    'label',
                    { className: 'col-sm-4 control-label', htmlFor: 'email' },
                    'Email'
                ),
                React.createElement(
                    'div',
                    { className: 'col-sm-8' },
                    React.createElement('input', { className: 'form-control input-lg', type: 'email', id: 'email', placeholder: 'Email' })
                )
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                    'label',
                    { className: 'col-sm-4 control-label', htmlFor: 'pwd' },
                    '密码'
                ),
                React.createElement(
                    'div',
                    { className: 'col-sm-8' },
                    React.createElement('input', { className: 'form-control input-lg', type: 'password', id: 'pwd', placeholder: '输入密码' })
                )
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                    'label',
                    { className: 'col-sm-4 control-label', htmlFor: 'pwd2' },
                    '密码'
                ),
                React.createElement(
                    'div',
                    { className: 'col-sm-8' },
                    React.createElement('input', { className: 'form-control input-lg', type: 'password', id: 'pwd2', placeholder: '确认密码' })
                )
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                    'label',
                    { className: 'col-sm-4 control-label', htmlFor: 'code' },
                    '验证码'
                ),
                React.createElement(
                    'div',
                    { className: 'col-sm-8' },
                    React.createElement('input', { className: 'form-control input-lg', type: 'text', id: 'code', placeholder: '输入验证码' })
                )
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                    'div',
                    { className: 'col-sm-offset-4 col-sm-8' },
                    React.createElement('input', { className: 'btn btn-default btb-lg btn-block', type: 'submit', value: '注册' })
                )
            )
        );
    }
});

module.exports = Form;