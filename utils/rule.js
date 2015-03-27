var xregexp = require("xregexp").XRegExp;

module.exports = {
    isMobile: function(str) {
        return /\d{11}/g.test(str.trim());
    },
    isEmail: function(str) {
        return /[a-z0-9-_.]+@(?:[a-z0-9-_]+\.)+[a-z]+/gi.test(str.trim());
    },
    isPwd: function(str) {
        var l = str.length;
        return 5 < l && l < 17;
    },
    isNameInLen: function(str) {
        return str.trim().length < 18;
    },
    isPwdSame: function(str1, str2) {
        return str1 === str2;
    },
    isNotEmpty: function(str) {
        return str.trim().length;
    }
};
