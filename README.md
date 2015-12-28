# grunt-jade-ng-template-cache
Grunt task to compile jade templates to angular template cache

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

	ngtemplatecache: {
		options: { module: "my-app", dest: "public/app/templates.js" },
		app: {
			files: [{
				expand: true,
				cwd: "public/app/",
				src: ["**/*.jade"],
				dest: "/templates/",
				ext: ""
			}]
		}
	}
	
});
````

`files` parameter follows [the grunt files format](http://gruntjs.com/configuring-tasks#files).
`dest` will actually become the path prefix in [$templatecache](https://docs.angularjs.org/api/ng/service/$templateCache), this is the destination you fetch the files from a server from, when not using `templatecache`.
