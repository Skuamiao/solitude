module.exports = function(api) {
    var imageMagick = require('gm').subClass({imageMagick: true});
    imageMagick('./assets/images/code-base.png')
        .fill('#53c619')
        .fontSize(14)
        .drawText(3, 16,'1 2 3 4')
        .swirl(-67)
        .toBuffer('png', function(err, buf) {
            if(err) {
                console.log(err);
                api.route('/verify').get(function(req, res) {
                    res.sendFile('verify-demo.png', {
                        root: './assets/images'
                    });
                });
            }else {
                api.route('/verify').get(function(req, res) {
                    res.send(buf);
                });
            }
        });
};
