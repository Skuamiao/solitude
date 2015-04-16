var crypto = require("crypto");
module.exports = {
    SHA1: function(str) {
        var shasum = crypto.createHash("sha1");
        shasum.update(str, "utf8");
        return shasum.digest("hex");
    }
};
