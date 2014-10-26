'use strict'

var fs = require('fs');

// constants and functions

function getTheme(grunt){
	var dir = './css/themes/';
	var themes = fs.readdirSync(dir);
	var defaultTheme = dir + 'dark.css';
	var customTheme = null;

	themes.forEach(function(file){		
		var filename = file.replace(/^.*[\\\/]/, '')
		var fileNameWithoutExtension = filename.split('.')[0]
		if (grunt.option(fileNameWithoutExtension) !== undefined ){
			customTheme = dir + file;
		}
	});

	return customTheme ? customTheme: defaultTheme;
}

module.exports = function (grunt) {
	
	//loading plugins
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.initConfig({
		
		// configuring tasks

		// Concat and minify javascripts
		uglify: {
			options: {
				mangle: false
			},
			dist: {
				files: {
					'./build/js/keynapse.min.js': [
						'./js/keynapse.js'
					]
				}
			}
		},

		// Concat and minify css with default theme(dark)
		cssmin: {
			combine: {
				files: {
					'./build/css/keynapse.min.css': ['./css/keynapse.css', getTheme(grunt) ]
				}
			}
		}
	});

	// default task
	grunt.registerTask( 'default', [ 'uglify', 'cssmin' ] );

	// build task with white theme
	//grunt.registerTask( 'white', [ 'uglify', 'cssmin_white' ] );
}