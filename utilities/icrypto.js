var crypto = require("crypto"),
    buffer = require("buffer");
module.exports = {
    sha1: function(str) {
        var shasum = crypto.createHash("sha1");
        shasum.update(str, "utf8");
        return shasum.digest("hex");
    }/*,
    escape: function(str) {
        return new buffer.Buffer(new buffer.Buffer(str).toString("hex"))
                                                            .toString("base64");
    },
    unescape: function(str) {
        return new buffer
        .Buffer(new buffer.Buffer(str, "base64").toString(), "hex").toString();
    }*/
};