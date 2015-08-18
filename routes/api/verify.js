module.exports = function(api) {
    var imageMagick = require('gm').subClass({imageMagick: true});
    api.route('/verify').get(function(req, res) {
        imageMagick(process.cwd() + '/assets/images/code-base.png')
            .fill('#53c619')
            .fontSize(14)
            .drawText(3, 16,'1 23 4')
            .swirl(-83)
            .toBuffer('png', function(err, buf) {
                if(err) throw err;
                res.send(buf);
            });
    });
};