require("../styles/bootstrap.css");
require('../styles/bootstrap-theme.css');
var React = require('react'),
    signUp = React.createFactory(require('../../jsxes/form-sign-up.js'));
React.render(signUp(), document.getElementById('form-sign-up'));
