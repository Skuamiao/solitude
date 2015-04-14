/*
    o = req.body,
    emailFlag = r.isEmail(o.email),
    pwdFlag1 = r.isPwd(o.pwd) && r.isPwd(o.pwd2),
    pwdFlag2 = r.isPwdSame(o.pwd, o.pwd2),
    nameFlag1 = r.isNameNotEmpty(o.name),
    nameFlag2 = r.isNameInLen(o.name),
    
    
    if(err[emailFlag])
        arr.push(err[emailFlag]);

    if(err[pwdFlag1])
        arr.push(err[pwdFlag1]);
    else if(err[pwdFlag2])
        arr.push(err[pwdFlag2]);

    if(err[nameFlag1])
        arr.push(err[nameFlag1]);
    else if(err[nameFlag2])
        arr.push(err[nameFlag2]);
*/
module.exports = function rules(p) {
    var isEmail = function(str) {
            return (str.length < 28 
                    && /[a-z0-9-_.]+@(?:[a-z0-9-_]+\.)+[a-z]+/gi.test(str)) 
                    ? true 
                    : "1000";
        },
        isPwd = function(str) {
            var l = str.length;
            return 5 < l && l < 17 ? true : "2000";
        },
        isPwdSame = function(str1, str2) {
            return str1 === str2 ? true : "2001";
        },
        isNameNotEmpty = function(str) {
            return str.length;
        },
        isNameInLen = function(str) {
            return str.length < 18 ? true : "3001";
        },
        /*isMobile = function(str) {
            return /\d{11}/g.test(str.trim());
        }*/
        error = require("./errors"),
        flag = {
            email: 1,
            pwd: 1,
            pwdSame: 1,
            name: 1
        },
        rt = {},
        buf = [],
        item = "",
        pwd = "",
        pwd2 = "",
        prop = null;
    
    for(prop in p) {
        if(p.hasOwnProperty(prop)) {
            item = p[prop].trim();
            rt[prop] = item;
            switch(prop) {
                case "email":
                    if(error[isEmail(item)])
                        flag.email = 0;
                break;
                case "pwd":
                    pwd = item;
                    if(error[isPwd(item)])
                        flag.pwd = 0;
                break;
                case "pwd2":
                    pwd2 = item;
                    if(error[isPwd(item)])
                        flag.pwd = 0;
                case "name":
                    if(isNameNotEmpty(item) && error[isNameInLen(item)]) 
                        flag.name = 0;
                break;
            }
        }
    }
    
    if(error[isPwdSame(pwd, pwd2)])
        flag.pwdSame = 0;
    
    console.log(flag, rt);
    
};
