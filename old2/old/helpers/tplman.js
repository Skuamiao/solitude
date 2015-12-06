module.exports = function tplman(solitude) {
    // siwg template
    solitude.engine("swig", require("swig").renderFile);
    solitude.set("view engine", "swig");
};
