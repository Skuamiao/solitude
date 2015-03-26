module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        clean: {
            css: ["statics/styl/**/*.css", "!statics/styl/normalize.css"]
        },
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
                dest: "statics/styl/dest/",
                ext: ".css",
                extDot: "last"
            }
        },
        csslint: {
            src: ["statics/styl/dest/*.css"]
        },
        /*uglify: {
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
        jshint: {
            
        },*/
        concat: {
            "sign-up": {
                options: {
                    banner: "/* normalize, default, header, footer */\n"
                },
                dest: "statics/styl/sign-up.css",
                src: [
                    "statics/styl/normalize.css",
                    "statics/styl/dest/default.css",
                    "statics/styl/dest/header.css",
                    "statics/styl/dest/footer.css"
                ]
            }
            
//            dev: {
//                options: {
//                    separator: ';',
//                    process: function(src) {
//                        return src.replace(
//                            /\s*\n*(?:'use strict'|"use strict");*\s*\n*/g, 
//                            ""
//                        );
//                    }
//                },
//                files: [
//                    {
//                        
//                        dest: "statics/scripts/cc.js",
//                        src: [
//                            "statics/scripts/src/hi.js", 
//                            "statics/scripts/src/shout.js"
//                        ]
//                    }
//                ]
//            }
            
        }
    });
    
    // clean
    grunt.loadNpmTasks("grunt-contrib-clean");
    // stylus
    grunt.loadNpmTasks("grunt-contrib-stylus");
    // csslint
    grunt.loadNpmTasks("grunt-contrib-csslint");
    // uglify
    // grunt.loadNpmTasks("grunt-contrib-uglify");
    // concat
    grunt.loadNpmTasks("grunt-contrib-concat");

    // default
    grunt.registerTask("default", ["clean", "stylus", "csslint", "concat"]);

};
