function isEmail(email) {
    var email = email.trim();
    return email.length < 28
                && /[a-z0-9-_.]+@(?:[a-z0-9-_]+\.)+[a-z]+/gi.test(email);
}
function isPwd(pwd) {
    var l = pwd.length;
    return 5 < l && l < 17;
}
function isPwdSame(pwd1, pwd2) {
    return isPwd(pwd1) && isPwd(pwd2) && pwd1 === pwd2;
}
function isNotEmpty(str) {
    return str.trim().length;
}
function isNameInLen(name) {
    return name.trim().length < 18;
}

function validateSign(type, data) {
    var flag = {
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
        prop = null,
        out = null;

    for(prop in data)
        if(data.hasOwnProperty(prop)) {
            item = data[prop];

            if(prop === "pwd" || prop === "pwd2")
                rt[prop] = item;
            else
                rt[prop] = item.trim();

            switch(prop) {
                case "email":
                    if(!isEmail(item))
                        flag.email = 0;
                break;
                case "pwd":
                    pwd = item;
                    if(!isPwd(item))
                        flag.pwd = 0;
                break;
                case "pwd2":
                    pwd2 = item;
                    if(!isPwd(item))
                        flag.pwd = 0;
                break;
                case "name":
                    if(!(isNotEmpty(item) || isNameInLen(item)))
                        flag.name = 0;
                break;
            }
        }

    // 区分注册或登录
    if(type === "up" && !isPwdSame(pwd, pwd2))
        flag.pwdSame = 0;

    if(!(flag.email || flag.pwd))
        out = {
            succeeded: 0,
            msg: "请填写邮箱和密码"
        };
    else if(!(flag.email && flag.pwd))
        out = {
            succeeded: 0,
            msg: "邮箱或密码填写不正确"
        };
    else if(!flag.pwdSame)
        out = {
            succeeded: 0,
            msg: "两次填写的密码不一致"
        };
    else if(!flag.name)
        out = {
            succeeded: 0,
            msg: "请填写正确的称号"
        };
    else
        out = {
            succeeded: 1,
            data: rt
        };

    return out;
}

module.exports = {
    validateSign: validateSign
};

/*
function isMobile(str) {
    return /\d{11}/g.test(str.trim());
}*/
/*
var isEmail = function(str) {
        return (str.length < 28
                && /[a-z0-9-_.]+@(?:[a-z0-9-_]+\.)+[a-z]+/gi.test(str))
                                                            ? true : "1000";
    },
    isPwd = function(str) {
        var l = str.length;
        return (5 < l && l < 17) ? true : "2000";
    },
    isPwdSame = function(str1, str2) {
        return isPwd(str1) === true && isPwd(str2) === true
                                        && str1 === str2 ? true : "2001";
    },
    isNameNotEmpty = function(str) {
        return str.length;
    },
    isNameInLen = function(str) {
        return str.length < 18 ? true : "3001";
    }
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
    prop = null,
    out = null;

for(prop in data)
    if(data.hasOwnProperty(prop)) {
        if(prop === "pwd" || prop === "pwd2")
            item = data[prop];
        else
            item = data[prop].trim();

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
            break;
            case "name":
                if(isNameNotEmpty(item) && error[isNameInLen(item)])
                    flag.name = 0;
            break;
        }
    }

// 区分注册或登录
if(data.pwd2 && data.name && error[isPwdSame(pwd, pwd2)])
    flag.pwdSame = 0;


if(!(flag.email || flag.pwd))
    out = {
        succeeded: 0,
        msg: "请填写正确的信息"
    };
else if(!(flag.email && flag.pwd))
    out = {
        succeeded: 0,
        msg: "邮箱或密码填写不正确"
    };
else if(!flag.pwdSame)
    out = {
        succeeded: 0,
        msg: "两次填写的密码不一致"
    };
else if(!flag.name)
    out = {
        succeeded: 0,
        msg: "请填写正确的称号"
    };
else
    out = {
        succeeded: 1,
        data: rt
    };

return out;
*/
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
