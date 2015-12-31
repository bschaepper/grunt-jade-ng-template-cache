# grunt-jade-ng-template-cache
Grunt task to compile jade templates to angular template cache, replacing on-the-fly jade rendering seamlessly.

## Getting Started
This plugin requires Grunt `>=0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jade-ng-template-cache --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jade-ng-template-cache');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.1](https://github.com/gruntjs/grunt-contrib-stylus/tree/grunt-0.3-stable).*

## Sample config

````javascript
grunt.initConfig({

    jadengtemplatecache: {
        options: {
            module: "my-app",
            dest: "public/app/templates.js",
            jade: {}
        },
        app: {
            files: [{
                expand: true,
                cwd: "public/app/",
                src: ["**/*.jade"],
                dest: "/templates/",
                ext: ".html"
            }]
        }
    }

});
````


## Options

### files

`files` parameter follows [the grunt files format](http://gruntjs.com/configuring-tasks#files).  

### options.module
`module` will be used as your angular module name, `$templateCache` will be configured in a `run` section of the given module. It is assumed this module exists, you either have to create it beforehand using `angular.module("templates", [])` and specify it as a dependency to your app, or just reuse your main module name.

### options.dest

`dest` will actually become the path prefix in [$templatecache](https://docs.angularjs.org/api/ng/service/$templateCache), this is the destination you fetch the files from a server from, when not using `$templateCache`.  

### options.jade
`jade` configure jade options if you have some globals or anything you'd like to override. This is passed to jade renderer, so it follows [jade options format](http://jade-lang.com/api/)

## Sample output

Above configuration would result in something like this generated file `public/app/templates.js`:

````javascript
(function () {
"use strict";
angular.module("my-app").run(["$templateCache", function ($templateCache) {
[{"url":"/templates/home/template.html","template":"<div/>"}]
.forEach(function (template) { $templateCache.put(template.url, template.template); });
}]);
}());
````

In this example there is a `public/app/home/template.jade` file, which will be put to $templateCache
with the url `/templates/home/template.html`. 

In Development mode you probably want to configure the `/templates/**` url to just render and return jade templates on the fly.
