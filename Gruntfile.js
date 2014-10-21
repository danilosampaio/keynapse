'use strict'

// constants and functions

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

		// Concat and minify css
		cssmin: {
			combine: {
				files: {
					'./build/css/keynapse.min.css': ['./css/keynapse.css']
				}
			}
		}
	});

	// default task
	grunt.registerTask( 'default', [ 'uglify', 'cssmin' ] );
}