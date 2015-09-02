require('../styles/sign-up.less');

var React = require('react'),
    signUp = React.createFactory(require('../../jsxes/sign-up.jsx'));
React.render(signUp({
    emailPassed: false,
    pwdPassed: false,
    rePwdPassed: false,
    codePassed: false,
    submitShould: false
}), document.getElementById('form-sign-up'));
