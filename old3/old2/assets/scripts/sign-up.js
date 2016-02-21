require('../styles/sign-up.less');

var React = require('react'),
    signUpForm = React.createFactory(require('../../jsxes/sign-up.jsx'));
React.initializeTouchEvents(true);
React.render(signUpForm(), document.getElementById('form-sign-up'));
