// 3rd party modules
const babelify = require('babelify');
const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');

// public
gulp.task('build', () => {
  browserify('./cli.js')
    .transform(babelify)
    .bundle()
    .on('error', err => console.error(err.message, err.stack))
    .pipe(source('index.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', [], () => {
  return gulp.watch(['*.js', 'src/**/*.js'], ['build']);
});
