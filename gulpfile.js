"use strict";

var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");
var gulpif = require("gulp-if");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var ngAnnotate = require("gulp-ng-annotate");
var templateCache = require("gulp-angular-templatecache");
var sourcemaps = require("gulp-sourcemaps");
var yargs = require("yargs");
var del = require("del");
var path = require("path");

var config = require("./gulpfile.config.json");

var argv = yargs.argv;

gulp.task("clean", function(cb) {
  return del(config.dist + "**/*", cb);
});

gulp.task("templates", function() {
  return gulp
    .src(config.templates)
    .pipe(
      htmlmin({
        collapseWhitespace: true
      })
    )
    .pipe(
      templateCache({
        module: "app",
        root: "src/app",
        standalone: false,
        transformUrl: function(url) {
          return url.replace(path.dirname(url), ".");
        }
      })
    )
    .pipe(gulp.dest(".tpl"));
});

gulp.task("javascript", ["templates"], function() {
  return gulp
    .src(config.scripts)
    .pipe(concat("main.js"))
    .pipe(ngAnnotate())
    .pipe(gulpif(argv.release, uglify()))
    .pipe(gulp.dest(config.dist + "build/"));
});

gulp.task("vendors", ["javascript"], function() {
  return gulp
    .src(config.vendors)
    .pipe(concat("vendor.js"))
    .pipe(gulpif(argv.release, uglify()))
    .pipe(gulp.dest(config.dist + "build/"));
});

gulp.task("sass", function() {
  return gulp
    .src(config.scss[0])
    .pipe(gulpif(argv.release, sourcemaps.init()))
    .pipe(concat("main.css"))
    .pipe(
      sass({
        outputStyle: "compressed"
      })
    )
    .pipe(autoprefixer())
    .pipe(gulpif(argv.release, sourcemaps.write()))
    .pipe(gulp.dest(config.dist + "build/"));
});

gulp.task("copy", function() {
  return gulp
    .src(config.static, {
      base: "src"
    })
    .pipe(gulp.dest(config.dist));
});

gulp.task("watch", ["javascript"], function() {
  gulp.watch([config.scripts, config.templates], ["javascript"]);
  gulp.watch(config.scss, ["sass"]);
});

gulp.task("default", ["copy", "sass", "javascript", "watch"]);
gulp.task("build", ["copy", "sass", "vendors"]);

gulp.task("ionic:serve:before", ["watch"]);
