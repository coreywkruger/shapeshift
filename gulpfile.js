var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('connect');
var http = require('http');

var jsDestination = "dist/js";
var cssDestination = "dist/css";
var fontDestination = "dist/fonts";

// Serve up app.
gulp.task('serve', function() {
  var app = connect()
    .use(connect.logger('dev'))
    .use(connect.static('./dist'));

  http.createServer(app).listen(4001);
});

// Build JavaScript files.
// Corey's stuff
gulp.task('js', function() {
  return gulp.src([
      'node_modules/three/three.js',
      'node_modules/jquery/dist/jquery.min.js',
      'src/js/**/*.js'
    ])
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest(jsDestination));
});

// Build fonts.
gulp.task('fonts', function() {
  return gulp.src([
      'bower_components/uikit/fonts/**/*',
    ])
    .pipe(gulp.dest(fontDestination));
});

gulp.task('css', function() {
  return gulp.src([
      'src/css/styles.scss'
    ])
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(cssDestination));
});

gulp.task('default', ['js', 'css', 'fonts', 'serve'],
  function() {
    gulp.watch(['src/css/**/*'], ['css']);
    gulp.watch(['src/js/**/*'], ['js']);
  });

gulp.task('dist', ['js', 'css', 'fonts'], function() {
  return gulp.src([
    ''
  ])
});