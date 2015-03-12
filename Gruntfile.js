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
                src: ["statics/styl/*.styl"],
                ext: ".css",
                extDot: "last"
            }
        }
    });

    // Load the plugin that provides the "stylus" task.
    grunt.loadNpmTasks("grunt-contrib-stylus");

    // Default task(s).
    grunt.registerTask("default", ["stylus"]);

};
