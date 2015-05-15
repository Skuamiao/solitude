module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        clean: {
            // css: ["statics/styl/**/*.css", "!statics/styl/normalize.css"],
            sql: ["sql/solitude.sql"]
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
            src: ["statics/styl/dest/*.css", "!statics/styl/dest/normalize.css"]
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
            "sql": {
                options: {
                    banner: "/* extensions, tables, functions, privileges */\n"
                },
                dest: "sql/solitude.sql",
                src: [
                    "sql/extensions.sql",
                    "sql/gen_id.sql",
                    "sql/get_author_id.sql",
                    "sql/existed_author.sql",
                    "sql/set_author.sql",
                    "sql/set_article.sql",
                    "sql/authors.sql",
                    "sql/articles.sql",
                    "sql/privileges.sql"
                ]
            }
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
    });

    // clean
    grunt.loadNpmTasks("grunt-contrib-clean");
    // stylus
    // grunt.loadNpmTasks("grunt-contrib-stylus");
    // csslint
    // grunt.loadNpmTasks("grunt-contrib-csslint");
    // uglify
    // grunt.loadNpmTasks("grunt-contrib-uglify");
    // concat
    grunt.loadNpmTasks("grunt-contrib-concat");

    // default
    grunt.registerTask("default", ["clean", "concat"]);

};
