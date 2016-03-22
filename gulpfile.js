var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var cache = require('gulp-cache');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var shell = require('gulp-shell');

gulp.task('styles', function() {
  return gulp.src('src/styles/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(autoprefixer('last 1 version'))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/styles'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('public/images'));
});

gulp.task('scripts-watch', ['scripts'], browserSync.reload);
gulp.task('images-watch', ['images'], browserSync.reload);

gulp.task('serve', ['build'], function() {
  browserSync.init({
    proxy: 'localhost:3000'
  })

  gulp.watch('src/styles/**/*.css', ['styles']);
  gulp.watch('src/js/**/*.js', ['scripts-watch']);
  gulp.watch('src/images/**/*', ['images-watch']);
  gulp.watch('views/**/*.hbs').on('change', browserSync.reload);
});

gulp.task('build', function() {
  gulp.start('styles', 'scripts', 'images');
});

gulp.task('default', ['build']);
