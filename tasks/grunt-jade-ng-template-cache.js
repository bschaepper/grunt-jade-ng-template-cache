"use strict";

var Q = require("q");
var jade = require("jade");

module.exports = function (grunt) {
    grunt.registerMultiTask("jadengtemplatecache", "Create angular $templateCache from Jade sources", function () {

        var done = this.async();
        var files = this.files;
        var templates = [];
        var options = this.options({ module: "templates", dest: ".", jade: {} });
        var angularModule = options.module;
        var destFile = options.dest;

        return loadTemplates()
            .then(writeTemplateLoader)
            .then(done)
            .catch(done);


        function loadTemplates() {
            return Q.all(files.map(function (dir) {
                return Q.all(dir.src.map(renderTemplate.bind(null, dir)));
            }));
        }

        function renderTemplate(dir, file) {
            jade.renderFile(file, options.jade, function (error, html) {
                if (error) {
                    done(error);
                    return;
                }

                templates.push({
                    url: dir.dest,
                    template: html
                });
            });
        }

        function writeTemplateLoader() {
            var loaderSource = [
                "(function () {",
                "\"use strict\";",
                "angular.module(\"" + angularModule + "\").run([\"$templateCache\", function ($templateCache) {",
                JSON.stringify(templates),
                ".forEach(function (template) { $templateCache.put(template.url, template.template); });",
                "}]);",
                "}());"
            ].join("\n");

            grunt.file.write(destFile, loaderSource);
        }
    });
};
