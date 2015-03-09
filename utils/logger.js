var morgan = require("morgan"),
    fs = require("fs"),
    logger = function(conf) {
        var logsDir = conf.cwd + conf.logsDir,
            logPath = logsDir + "/access.log";

        fs.mkdir(logsDir, function(err) {
            if(err && err.code === "EEXIST") return;
            else if(err) throw err;

            fs.open(logPath, "a", function(err, fd) {
                fs.close(fd);
            });
        });

        morgan.token("date", function(req) {
            var o = req._startTime;
            return o.getFullYear() + "-" + (o.getMonth() + 1) + "-" + o.getDate() + " " + o.toTimeString().split(/\s+/g)[0];
        });

        return morgan(
            ":remote-addr _ :remote-user _ :date _ :method _ :url _ :http-version _ :status _ :res[content-length] _ :response-time _ :referrer _ :user-agent",
            {stream: fs.createWriteStream(logPath, {flags: "a"})}
        );
    };

module.exports = logger;
