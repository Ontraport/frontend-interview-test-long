'use strict'

var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var concatCSS = require('gulp-concat-css');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var gzip = require('gulp-gzip');
var imageminOptipng = require('imagemin-optipng');
var imageminJpegtran = require('imagemin-jpegtran');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync');

gulp.task('default', ['watch']);
gulp.task('build--clean', [
    'build--clean-dist'
]);
gulp.task('build--concat', [], function(cb) {
    runSequence(
        'build--concat-css',
        'build--browserify',
        cb
    );
});
gulp.task('build--compress', [], function(cb) {
    runSequence(
        [
            'build--compress-html',
            'build--compress-css',
            'build--compress-js'
        ],
        'build--compress-gzip',
        'build--compress-images',
        cb
    );
});
gulp.task('build', [], function(cb) {
    runSequence(
        'build--clean',
        'build--concat',
        'build--compress',
        'build--update-linking',
        cb
    );
});

var dist = 'dist';
var bundles = 'src/_bundles';
var images = 'src';
var css = 'src/styles/css'

gulp.task('watch', function() {
    gulp.watch('src/services/**/*.*', ['build--concat']);
    gulp.watch('src/styles/**/*.*', ['build--concat']);
    gulp.watch('src/views/**/*.*', ['build--concat']);
    gulp.watch('src/*.js', ['build--concat']);

    browserSync({
        files: [
            bundles + '/*.*',
            'src/*.html'
        ],
        server: {
            baseDir: "dist" // Change this to your web root dir
        }
    });
});

// Clear the distribution directory in case files/folders were removed from last build.
gulp.task('build--clean-dist', [], function() {
    return gulp.src([
            dist
        ], {
            read: false
        })
        .pipe(clean())
        .pipe(gulp.dest('./'));
});

// Browserify
gulp.task('build--browserify', function() {
    // Single entry point to browserify 
    gulp.src('src/index.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: false,
            shim: {
                box: {
                    path: 'res/box.js/box.js',
                    exports: 'box'
                }
            },
            paths: ['res'],
            transform: []
        }))
        .pipe(gulp.dest(bundles))
});

// Concat CSS
gulp.task('build--concat-css', [], function() {
    return gulp.src([
            path.join('node_modules', 'famous', 'core', 'famous.css'),
            path.join(css, 'app.css'),
            path.join(css, 'normalize.css'),
            path.join(css, 'styles.css')
        ])
        .pipe(concatCSS('styles.css'))
        .pipe(gulp.dest(bundles));
});

// Minify JS with source maps and generate source maps.
gulp.task('build--compress-js', [], function() {
    return gulp.src([
            path.join(bundles, '**', '*.js')
        ])
        .pipe(uglify())
        .pipe(rename(function(path) {
            path.extname = '.min.js'
        }))
        .pipe(gulp.dest(dist));
});

// Minify CSS.
gulp.task('build--compress-css', [], function() {
    return gulp.src([
            path.join(bundles, '**', '*.css')
        ])
        .pipe(rename(function(path) {
            path.extname = '.min.css'
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest(path.join(dist)));
});

// Minify HTML
gulp.task('build--compress-html', [], function() {
    return gulp.src([
            'src/index.html'
        ])
        .pipe(minifyHTML({
            conditionals: true,
            spare: true
        }))
        .pipe(gulp.dest(dist));
});

// Image compression. 
gulp.task('build--compress-images', [], function() {
    return gulp.src([
            path.join(images, '**', '*.{png,jpg,jpeg,gif,svg}')
        ])
        .pipe(imageminOptipng({
            optimizationLevel: 2
        })())
        .pipe(imageminJpegtran({
            progressive: true
        })())
        .pipe(gulp.dest(path.join(dist)));
});

// Change file link linking in index.html
gulp.task('build--update-linking', [], function(cb) {
    var fileExists = fs.existsSync(path.join(dist, 'index.html'));
    if (fileExists === true) {
        var indexHTML = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');
        indexHTML = indexHTML.replace('_bundles/styles.css', 'styles.min.css');
        indexHTML = indexHTML.replace('_bundles/index.js', 'index.min.js');
        fs.writeFileSync(path.join(dist, 'index.html'), indexHTML);
    }
    return cb();
});

gulp.task('build--compress-gzip', [], function() {
    return gulp.src(
            path.join(dist, '**', '*.{html,xml,json,css,js}')
        )
        .pipe(gzip({
            append: true,
            threshold: false
        }))
        .pipe(gulp.dest(dist));
});
