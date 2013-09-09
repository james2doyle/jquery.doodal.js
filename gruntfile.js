module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ["js/script.min.js", "css/style.min.css"],
    cssmin: {
      add_banner: {
        options: {
          banner: '/*! <%= pkg.name %> v<%= pkg.version %> ' + '<%= grunt.template.today("mm.dd.yyyy") %> */'
        },
        files: {
          'css/style.min.css': ['css/**/*.css', '!style.min.css']
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> ' + '<%= grunt.template.today("mm.dd.yyyy") %> */'
      },
      my_target: {
        files: {
          'js/jquery.doodal.min.js': ['js/jquery.doodal.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['clean', 'cssmin', 'uglify']);
};
