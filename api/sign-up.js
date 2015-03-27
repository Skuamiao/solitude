module.exports = function signUp(api, bp) {
    api
    .use(bp.urlencoded({ extended: true }))
    .route("/sign-up")
    .post( function(req, res) {
        var r = require("../utils/rule");
            err = {
                pwda: "密码不正确",
                pwdb: "密码不相同",
                name: "用户名不正确",
                email: "邮箱不正确"
            },
            o = req.body,
            arr = [];
        if(!r.isEmail(o.email)) 
            arr.push(err.email);
        
        if(!(r.isPwd(o.pwd) && r.isPwd(o.pwd2)))
            arr.push(err.pwda);
        else if(!r.isPwdSame(o.pwd, o.pwd2)) 
            arr.push(err.pwdb);
        
        if(o.name.trim().length && !r.isNameInLen(o.name)) 
            arr.push(err.name);
        
        if(arr.length)
            res.status(200).end(arr.join(";\n") + "!");
        else
            res.status(200).end("all right!");
    });
};
