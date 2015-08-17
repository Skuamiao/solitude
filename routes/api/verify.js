module.exports = function(api) {
    var imageMagick = require('gm').subClass({imageMagick: true});
    api.route('/verify').get(function(req, res) {
        imageMagick(process.cwd() + '/assets/images/code-base.png').fontSize(14).drawText(3, 16,'1 2 3 4').mosaic().write(process.cwd() + '/assets/images/test.png', function(err) {
            if(err) throw err;
            res.sendFile(
                'test.png', 
                {root: process.cwd() + '/assets/images'}, 
                function (err) {
                    if (err) throw err;
                }
            );
        });
    });
};