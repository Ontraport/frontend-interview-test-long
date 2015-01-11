'use strict';

module.exports = function(grunt) {
  var srcFiles = [
    './codetest/js/**/*.js',
    './codetest/app.js',
    './server/**/*.js',
    './tests/**/*.js',
    './tests/*.js'
  ];

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-mongoimport');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.initConfig({
    browserify: {
      dev: {
        src: ['./codetest/js/**/*.js'],
        dest: 'build/bundle.js',
        options: {
          transform: ['debowerify']
        }
      }
    },
    jshint: {
      all: srcFiles,
      options: {
        jshintrc: true
      }
    },
    copy: {
      codetest: {
        cwd: './codetest/',
        src: ['*.html', '*.css', 'images/**/*'],
        expand: true,
        dest: 'build/'
      }
    },
    clean: {
      dev: {
        src: ['build/**/*.js']
      }
      // css: {
      //   src: ['build/css/']
      // }
    },
    uglify: {
      my_target: {
        options: {
          compress: true
        },
        files: {
          './build/bundle.min.js': ['./build/bundle.js']
        }
      }
    },
    watch: {
      script: {
        files: [
          './*.js',
          'codetest/**/**.js',
          'codetest/**.js',
          'codetest/**/**.html',
          'codetest/**/**.css'
        ],
        tasks: ['build:js'],
        options: {
          livereload: true
        }
      }
    },
    jscs: {
      src: srcFiles,
      options: {
        config: '.jscsrc'
      }
    },
    mongoimport: {
      options: {
        db: 'ontraportApp',
        host: 'localhost',
        port: '27017',
        stopOnError: true,
        collections: [
          {
            name: 'users',
            type: 'json',
            file: './codetest/data/users.json',
            jsonArray: true,
            upsert: true,
            drop: true
          },
          {
            name: 'posts',
            type:'json',
            file: './codetest/data/posts.json',
            jsonArray: true,
            upsert: true,
            drop: true
          }
        ]
      }
    },
    simplemocha: {
      src: ['tests/postTest.js', 'tests/userTest.js']
    }
  });

  grunt.registerTask('build:dev', ['clean:dev', 'copy:codetest', 'browserify:dev', 'mongoimport']);
  grunt.registerTask('build', ['build:dev']);
  grunt.registerTask('test', ['build:dev', 'jshint', 'jscs', 'simplemocha']);
  grunt.registerTask('default', ['test']);
};
