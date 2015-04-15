var crypto = require("crypto"),
    shasum = crypto.createHash("sha1");
module.exports = {
    sha1: function(str) {
        shasum.update(str, "utf8");
        return shasum.digest("hex");
    }
};
