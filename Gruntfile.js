module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        stylus: {
            options: {
                compress: false,
                "indent spaces": 4
            },
            files: {
                expand: true,
                cwd: "statics/styl/",
                src: ["src/*.styl"],
                flatten: true,
                dest: "statics/styl",
                ext: ".css",
                extDot: "last"
            }
        },
        uglify: {
            files: {
                expand: true,
                cwd: "statics/scripts/",
                src: ["src/*.js"],
                flatten: true,
                dest: "statics/scripts",
                ext: ".js",
                extDot: "last"
            }
        }
    });
    
    // stylus
    grunt.loadNpmTasks("grunt-contrib-stylus");
    // uglify
    grunt.loadNpmTasks("grunt-contrib-uglify");

    // default
    grunt.registerTask("default", ["stylus", "uglify"]);

};
