var serverStatic = require("serve-static"),
    staticman = function(solitude) {
    // serve static
    solitude.use("/styl", serverStatic("statics/styl", {index: false}));
    solitude.use("/script", serverStatic("statics/script", {index: false}));
    solitude.use("/img", serverStatic("statics/img", {index: false}));
};

module.exports = staticman;
