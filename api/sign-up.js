module.exports = function signUp(api, bp) {
    api
    .use(bp.urlencoded({ extended: true }))
    .route("/sign-up")
    .post( function(req, res) {
        var r = require("./rules");
            err = require("./errors"),
            o = req.body,
            emailFlag = r.isEmail(o.email),
            pwdFlag1 = r.isPwd(o.pwd) && r.isPwd(o.pwd2),
            pwdFlag2 = r.isPwdSame(o.pwd, o.pwd2),
            nameFlag1 = r.isNameNotEmpty(o.name),
            nameFlag2 = r.isNameInLen(o.name),
            arr = [];
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

        if(arr.length)
            res.status(200).end(arr.join(";\n") + "!");
        else
            res.status(200).end("all right!");
    });
};
