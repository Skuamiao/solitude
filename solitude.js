var express = require("express"),
    solitude = express(),
    index = require("./routes/index"),
    articles = require("./routes/articles");

// solitude.set("x-powered-by", false);

solitude.use([index, articles]);

solitude.listen(8000);
