var express = require("express"),
    solitude = express();

solitude.get("/", function(req, res){
  res.send("hello world");
});

solitude.listen(8000);
