var express = require("express"),
    solitude = express(),
    index = require("./routes/index"),
    articles = require("./routes/articles"),
    article = require("./routes/article"),
    me = require("./routes/me"),
    blog = require("./routes/blog");

// solitude.set("x-powered-by", false);

solitude.use([index, articles, article, me, blog]);

solitude.listen(8000);
