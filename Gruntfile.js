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
                dest: "statics/scripts/",
                ext: ".js",
                extDot: "last"
            }
        },
        concat: {
            dev: {
                options: {
                    separator: ';',
                    process: function(src) {
                        return src.replace(
                            /\s*\n*(?:'use strict'|"use strict");*\s*\n*/g, 
                            ""
                        );
                    }
                },
                files: [
                    {
                        
                        dest: "statics/scripts/cc.js",
                        src: [
                            "statics/scripts/src/hi.js", 
                            "statics/scripts/src/shout.js"
                        ]
                    }
                ]
            }
        }
    });
    
    // stylus
    grunt.loadNpmTasks("grunt-contrib-stylus");
    // uglify
    grunt.loadNpmTasks("grunt-contrib-uglify");
    // concat
    grunt.loadNpmTasks("grunt-contrib-concat");

    // default
    grunt.registerTask("default", ["stylus", "uglify", "concat"]);

};
