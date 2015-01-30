var express = require("express"),
    solitude = express(),
    index = require("./routes/index");

// solitude.set("x-powered-by", false);

solitude.use(index);

solitude.listen(8000);
