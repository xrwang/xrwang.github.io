// Include gulp
var gulp = require('gulp');
//connect server
  connect = require('gulp-connect');



// Include Our Plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

gulp.task('markup', function(){
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('index.html', ['markup']);
});

//run a webserver
gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});

// Default Task
gulp.task('default', ['sass','watch', 'markup','webserver']);
