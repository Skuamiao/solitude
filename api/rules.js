var xregexp = require("xregexp").XRegExp;

module.exports = {
    isEmail: function(str) {
        return /[a-z0-9-_.]+@(?:[a-z0-9-_]+\.)+[a-z]+/gi.test(str.trim()) ? true : "1000";
    },
    isPwd: function(str) {
        var l = str.length;
        return 5 < l && l < 17 ? true : "2000";
    },
    isPwdSame: function(str1, str2) {
        return str1 === str2 ？ true : "2001";
    },
    isNameNotEmpty: function(str) {
        return str.trim().length ? true : "3000";
    },
    isNameInLen: function(str) {
        return str.trim().length < 18 ？ true : "3001";
    },
    isMobile: function(str) {
        return /\d{11}/g.test(str.trim());
    }
};
