require('../styles/sign-up.less');

var React = require('react'),
    signUp = React.createFactory(require('../../jsxes/sign-up.js'));
React.render(signUp({
    emailFlag: false,
    pwdFlag: false,
    rePwdFlag: false,
    codeFlag: false
}), document.getElementById('form-sign-up'));
