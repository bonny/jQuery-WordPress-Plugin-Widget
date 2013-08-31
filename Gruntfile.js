module.exports = function (grunt) {

	grunt.initConfig({

		uglify: {
			myfiles: {
				files: {
					'jquery.WordPressPluginWidget.min.js': ['jquery.WordPressPluginWidget.js']
				}
			}
		}

	});

	// Load tasks so we can use them
	grunt.loadNpmTasks("grunt-contrib-uglify");

	// The dev task will be used during development
	grunt.registerTask("default", ["uglify"]);


};
