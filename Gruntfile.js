module.exports = function(grunt) {

  /* ====================================
   Project configuration
   ==================================== */

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: ['<%= pkg.directories.sass %>/**/*.sass'],
        tasks: ['sass:dev', 'autoprefixer'],
        options: {
          livereload: true,
        }        
      },
      concat: {
        files: ['<%= pkg.directories.js_dev %>/**/*.js'],
        tasks: ['jshint', 'concat'],
        options: {
          livereload: true,
        }
      }
    },
    sass: {
      dev: {
        options: {
          style: 'expanded',
          trace: true
        },
        files: {
          '<%= pkg.directories.css %>/style__<%= pkg.version %>.css': '<%= pkg.directories.sass %>/style.sass'
        }
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
         '<%= pkg.directories.css %>/style__<%= pkg.version %>.css': '<%= pkg.directories.sass %>/style.sass' 
        }
      }
    },
    concat: {
      dist: {
        src: ['<%= pkg.directories.js_dev %>/vendor/jquery-1.9.1.js','<%= pkg.directories.js_dev %>/vendor/modernizr.js','<%= pkg.directories.js_dev %>/**/*.js'],
        dest: '<%= pkg.directories.js %>/script__<%= pkg.version %>.js'
      }
    },
    jshint: {
      files: ['<%= pkg.directories.js_partials %>/*.js', '<%= pkg.directories.js_dev %>/script.js']
    },
    uglify: {
      options: {
        mangle: false,
        compress: {
          drop_console: true
        }        
      },
      my_target: {
        files: {
          '<%= pkg.directories.js %>/script__<%= pkg.version %>.js': ['<%= pkg.directories.js %>/script__<%= pkg.version %>.js']
        }
      }
    },    
    autoprefixer: {
      dist: {
        options: {
          browsers: ['last 3 versions', '> 1%', 'ie 8', 'ie 7']
        },
        src: '<%= pkg.directories.css %>/style__<%= pkg.version %>.css',
        dest: '<%= pkg.directories.css %>/style__<%= pkg.version %>.css'
      }
    }  
  });

  /* ====================================
   Enable plugins
   ==================================== */

  grunt.loadNpmTasks ('grunt-contrib-uglify');
  grunt.loadNpmTasks ('grunt-contrib-concat');
  grunt.loadNpmTasks ('grunt-autoprefixer');
  grunt.loadNpmTasks ('grunt-contrib-sass');
  grunt.loadNpmTasks ('grunt-contrib-watch');
  grunt.loadNpmTasks ('grunt-contrib-jshint');

  /* ====================================
   Default tasks
   ==================================== */

  grunt.registerTask('default', ['autoprefixer','sass:dev', 'concat', 'jshint','watch']);
  grunt.registerTask('dist', ['autoprefixer','sass:dist','concat', 'uglify']);

};