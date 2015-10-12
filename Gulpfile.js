var gulp  = require('gulp');
var babel = require('gulp-babel');

gulp.task('transpile', function () {
  return gulp.src('app/assets/javascripts/*.es6')
           .pipe(babel())
           .pipe(gulp.dest('spec/javascript/build/'));
});

gulp.task('watch', ['transpile'], function () {
  gulp.watch('app/assets/javascripts/*.es6', ['transpile'])
});

gulp.task('default', ['watch']);
