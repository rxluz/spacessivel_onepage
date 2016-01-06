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
    concat = require('gulp-concat');

var env,
    jsSources,
    sassSources,
    jsonSources,
    outputDir,
    sassStyle;

//env = process.env.NODE_ENV || 'development';
env == 'production';

if (env==='development') {
  outputDir = 'public/';
  sassStyle = 'expanded';
} else {
  outputDir = 'public/';
  sassStyle = 'compressed';
}

sassStyle = 'compressed';

jsSources = ['components/scripts/*.js'];
sassSources = ['components/sass/style.scss'];
jsonSources = ['components/scripts/*.json'];


gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(uglify())
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(connect.reload())
});

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      image: outputDir + 'images',
      style: sassStyle
    })
    .on('error', gutil.log))
    .pipe(gulp.dest(outputDir + 'css'))
    .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch('components/sass/*.scss', ['compass']);

  gulp.watch('components/js/*.json', ['json']);
  gulp.watch('components/images/*.*', ['images']);
});

gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    livereload: true
  });
});


gulp.task('json', function() {
  gulp.src('components/scripts/*.json')
    .pipe(jsonminify())
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(connect.reload())
});


gulp.task('images', function() {
  gulp.src('components/images/*.*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngcrush()]
    }))
    .pipe(gulp.dest(outputDir + 'images'))
    .pipe(connect.reload())
});

gulp.task('default', ['json', 'js', 'compass', 'images', 'connect', 'watch']);
