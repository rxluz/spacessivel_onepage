var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    jsonminify = require('gulp-jsonminify'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-html-minifier'),
    bower = require('gulp-bower'),
    del = require('del'),
    git = require("gulp-git"),
    pipe = require("gulp-pipe");

var env,
    bowerSources,
    htmlSources,
    jsSources,
    sassSources,
    jsonSources,
    outputDir,
    sassStyle;


///sassStyle = 'compressed';

htmlSources = ['./components/html/*.html'];
bowerSources = ['./bower_components/**/*.*'];
jsSources = ['./components/scripts/*.js'];
sassSources = ['./components/sass/style.scss'];
jsonSources = ['./components/scripts/*.json'];



/*
 * Generate html files in dev mode
 */
gulp.task('html', function() {
  del(outputDir + '*.html');
  gulp.src(htmlSources)
    .pipe(gulp.dest(outputDir))
});

/*
 * Generate html files in prod mode
 */
gulp.task('html_prod', function() {
  del(outputDir + '*.html');
  gulp.src(htmlSources)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(outputDir))
});


/*
 * Generate js files in dev mode
 */
gulp.task('js', function() {
  del(outputDir + 'js/**/*.*');

  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(connect.reload())
});

/*
 * Generate js files in prod mode
 */
gulp.task('js_prod', function() {
  del(outputDir + 'js/**/*.*');

  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(connect.reload())
});

/*
 * Generate bower files
 */
gulp.task('bower', function() {
  del(outputDir + 'libs/**/**');

  gulp.src(bowerSources)
    .pipe(gulp.dest(outputDir + 'libs'))
    .pipe(connect.reload())
});


/*
 * Generate sass files in dev mode
 */
gulp.task('compass', function() {
  del(outputDir + 'css/**/*.*');

  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      image: outputDir + 'images',
      style: 'expanded'
    })
    .on('error', gutil.log))
    .pipe(gulp.dest(outputDir + 'css'))
    .pipe(connect.reload())
});

/*
 * Generate sass files in prod mode
 */
gulp.task('compass_prod', function() {
  del(outputDir + 'css/**/*.*');

  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      image: outputDir + 'images',
      style: 'compressed'
    })
    .on('error', gutil.log))
    .pipe(gulp.dest(outputDir + 'css'))
    .pipe(connect.reload())
});


/*
 * Auto reload page
 */
gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    livereload: true
  });
});

/*
 * Generate json  files in dev mode
 */

gulp.task('json', function() {
  gulp.src('components/scripts/*.json')
    .pipe(jsonminify())
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(connect.reload())
});

/*
 * Generate sass files in prod mode
 */
gulp.task('json_prod', function() {
  gulp.src('components/scripts/*.json')
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(connect.reload())
});


/*
 * Generate images files in dev mode
 */
gulp.task('images', function() {
  gulp.src('components/images/*.*')
    .pipe(gulp.dest(outputDir + 'images'))
    .pipe(connect.reload())
});

/*
 * Generate images files in prod mode
 */
gulp.task('images_prod', function() {
  gulp.src('components/images/*.*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngcrush()]
    }))
    .pipe(gulp.dest(outputDir + 'images'))
    .pipe(connect.reload())
});


/*
 * Monitor files to dev mode
 */
gulp.task('dev', function() {
  //dev mode:
  //dont compress html
  //dont compress csss
  //dont compress js

  outputDir = './builds/development/';

  gulp.start('js', 'bower', 'json', 'compass', 'images', 'connect', 'html');

  gulp.watch('bower_components/**/*.*', ['bower']);
  gulp.watch('components/html/*.html', ['html']);
  gulp.watch(jsSources, ['js']);
  gulp.watch('components/js/*.json', ['json']);
  gulp.watch('components/sass/*.scss', ['compass']);
  gulp.watch('components/images/*.*', ['images']);
});


/*
 * Monitor files to prod mode
 */
gulp.task('prod', function() {
  //prod mode:
  //compress html
  //compress csss
  //compress js

  outputDir = './builds/production/';

  gulp.start('js_prod', 'bower', 'json_prod', 'compass_prod', 'images_prod', 'connect', 'html_prod');

  outputDir = './builds/production/';
  gulp.watch('bower_components/**/*.*', ['bower']);
  gulp.watch('components/html/*.html', ['html_prod']);
  gulp.watch(jsSources, ['js_prod']);
  gulp.watch('components/js/*.json', ['json_prod']);
  gulp.watch('components/sass/*.scss', ['compass_prod']);
  gulp.watch('components/images/*.*', ['images_prod']);
});
