// serve static
module.exports = function staticman(solitude) {
    var serverStatic = require("serve-static");
    solitude.use("/styl", serverStatic("statics/styl", {index: false}));
    solitude.use("/script", serverStatic("statics/script", {index: false}));
    solitude.use("/img", serverStatic("statics/img", {index: false}));
    // solitude.use("/upload", serverStatic("statics/upload", {index: false}));
};
