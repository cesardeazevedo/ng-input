'use strict';

var fs = require('fs')
  , gulp = require('gulp')
  , karma = require('karma').server
  , concat = require('gulp-concat')
  , jshint = require('gulp-jshint')
  , header = require('gulp-header')
  , rename = require('gulp-rename')
  , es = require('event-stream')
  , del = require('del')
  , uglify = require('gulp-uglify')
  , minifyHtml = require('gulp-minify-html')
  , minifyCSS = require('gulp-minify-css')
  , sass = require('gulp-sass')
  , templateCache = require('gulp-angular-templatecache')
  , gutil = require('gulp-util')
  , plumber = require('gulp-plumber')
  , order = require("gulp-order")
  , harp = require('harp')
  , cp = require('child_process')
  , browserSync = require('browser-sync')
  , reload = browserSync.reload;


var config = {
    pkg : JSON.parse(fs.readFileSync('./package.json')),
    banner:
    '/*!\n' +
        ' * <%= pkg.name %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' * Author: <%= pkg.author %>\n' +
        ' * Version: <%= pkg.version %> - <%= timestamp %>\n' +
        ' * License: <%= pkg.license %>\n' +
        ' */\n\n\n'
};

gulp.task('watch', function () {
    gulp.watch(['./index.html'], function(){
        reload('index.html', { stream: true });
    });
    gulp.watch(['./src/styles/*.sass'], ['styles'], function(){
        reload('ng-input.css', { stream: true });
    });
    gulp.watch(['./src/**/*.js', './**/*.html'], ['scripts']);
});

gulp.task('clean', function(cb) {
    del(['dist/**'], cb);
});

gulp.task('scripts', function() {

    function buildTemplates() {
        return gulp.src('src/ng-input.html')
        .pipe(minifyHtml({
            empty: true
          , spare: true
          , quotes: true
        }))
        .pipe(templateCache({ module: 'ngInput' }));
    }

    function buildDistJS(){
        return gulp.src('src/ng-input.js')
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
    }

    es.merge(buildDistJS(), buildTemplates())
    .pipe(plumber({
        errorHandler: handleError
    }))
    .pipe(concat('ng-input.js'))
    .pipe(header(config.banner, {
        timestamp: (new Date()).toISOString(), pkg: config.pkg
    }))
    .pipe(gulp.dest('dist'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function() {

    return gulp.src('src/styles/ng-input.sass')
    .pipe(sass())
    .pipe(header(config.banner, {
        timestamp: (new Date()).toISOString(), pkg: config.pkg
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('open', function() {
    harp.server(__dirname, {
        port: 9000
    }, function() {
        browserSync({
            proxy: "localhost:9000"
          , open: false
        });
    });
});

gulp.task('jshint-test', function(){
    return gulp.src('./test/**/*.js').pipe(jshint());
});

gulp.task('karma', function(done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js'
      , singleRun: true
    }, done);
});

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

gulp.task('build', ['clean', 'scripts', 'styles']);
gulp.task('serve', ['open', 'watch']);
gulp.task('default', ['build', 'test']);
gulp.task('test', ['jshint-test', 'karma']);
