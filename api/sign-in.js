module.exports = function signIn(api, bp) {
    api
    .use(bp.urlencoded({ extended: true }))
    .route("/sign-in")
    .post( function(req, res) {
        var r = require("../utils/rule");
            err = {
                pwda: "密码不正确",
                email: "邮箱不正确"
            },
            o = req.body,
            arr = [];
        if(!r.isEmail(o.email))
            arr.push(err.email);

        if(!r.isPwd(o.pwd))
            arr.push(err.pwda);

        if(arr.length)
            res.status(200).end(arr.join(";\n") + "!");
        else
            res.status(200).end("all right!");
    });
};
