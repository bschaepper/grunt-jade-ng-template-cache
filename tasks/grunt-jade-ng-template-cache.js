"use strict";

var Q = require("q");
var fs = require("fs");
var jade = require("jade");

module.exports = function (grunt) {
    grunt.registerMultiTask("jadengtemplatecache", "Create angular $templateCache from Jade sources", function () {

        var done = this.async();
        var options = this.options({ module: "templates", dest: "." });
        var angularModule = options.module;
        var destFile = options.dest;
        var templates = [];

        Q.all(this.files.map(function (dir) {
            return Q.all(dir.src.map(function (file) {

                jade.renderFile(file, function (error, html) {
                    if (error) {
                        done(error);
                        return;
                    }

                    templates.push({
                        url: dir.dest,
                        template: html
                    });
                });

            }));
        })).then(function () {
            var loaderSource = [
                "(function () {",
                "\"use strict\";",
                "angular.module(\"" + angularModule + "\").run(function ($templateCache) {",
                JSON.stringify(templates),
                ".forEach(function (template) { $templateCache.put(template.url, template.template); });",
                "});",
                "}());"
            ].join("\n");

            return Q.nfcall(fs.writeFile, destFile, loaderSource);
        }).then(done).catch(done);
    });
};
