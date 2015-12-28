"use strict";

module.exports = function (grunt) {

    grunt.initConfig({

        jshint: {
            all: {
                src: ["*.js", "tasks/*.js"]
            },
            options: {
                jshintrc: true
            }
        },

        jscs: {
            src: ["*.js", "tasks/*.js"],
            options: {
                config: "./.jscsrc"
            }
        },

        release: {
            options: {
                tagName: "release-<%= version %>"
            }
        }

    });

    require("load-grunt-tasks")(grunt);
    grunt.registerTask("test", ["jshint", "jscs"]);

};
