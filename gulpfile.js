var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    minifyCss = require('gulp-minify-css'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    jsonminify = require('gulp-jsonminify'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-html-minifier'),
    special = require('gulp-special-html'),
    //bower = require('gulp-bower'),
    del = require('del'),
    //git = require("gulp-git"),
    pipe = require("gulp-pipe");

var env,
    bowerSources,
    htmlSources,
    xmlSources,
    cssSources,
    jsSources,
    sassSources,
    jsonSources,
    outputDir,
    outputDirDev,
    sassStyle;

///sassStyle = 'compressed';
outputDirDev = './builds/development/';
outputDir = './builds/production/';

viewsSources = ['./components/views/*.html'];
htmlSources = ['./components/html/*.html'];
xmlSources = ['./components/html/*.xml'];
bowerSources = ['./bower_components/**/*.*'];
jsSources = ['./components/scripts/app.js', './components/scripts/services/authentication.js', './components/scripts/controllers/*.js'];
sassSources = ['./components/sass/style.scss'];
jsonSources = ['./components/scripts/*.json'];
cssSources = ['./components/css/*.css'];



/*
 * Generate views files in dev mode
 */
gulp.task('views', function() {
  del(outputDirDev + 'views/*.html');
  gulp.src(viewsSources)
    .pipe(special())
    .pipe(gulp.dest(outputDirDev+"views/"))
    .pipe(connect.reload())
});

/*
 * Generate html files in prod mode
 */
gulp.task('views_prod', function() {
  del(outputDir + 'views/*.html');
  gulp.src(viewsSources)
    .pipe(special())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(outputDir+"views/"))
    .pipe(connect.reload())
});



/*
 * Generate html files in dev mode
 */
gulp.task('html', function() {
  del(outputDirDev + '*.html');
  gulp.src(htmlSources)
    .pipe(special())
    .pipe(gulp.dest(outputDirDev))
    .pipe(connect.reload())
});

/*
 * Generate html files in prod mode
 */
gulp.task('html_prod', function() {
  del(outputDir + '*.html');
  gulp.src(htmlSources)
    .pipe(special())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload())
});



/*
 * Generate xml files in dev mode
 */
gulp.task('xml', function() {
  del(outputDirDev + '*.xml');
  gulp.src(xmlSources)
    .pipe(gulp.dest(outputDirDev))
    .pipe(connect.reload())
});

/*
 * Generate xml files in prod mode
 */
gulp.task('xml_prod', function() {
  del(outputDir + '*.xml');
  gulp.src(xmlSources)
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload())
});


/*
 * Generate js files in dev mode
 */
gulp.task('js', function() {
  del(outputDirDev + 'js/**/*.*');

  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify({
      insertGlobals : true,
      debug : !gulp.env.production
    }))
    .pipe(gulp.dest(outputDirDev + 'js'))
    .pipe(connect.reload())
});

/*
 * Generate js files in prod mode
 */
gulp.task('js_prod', function() {
  del(outputDir + 'js/**/*.*');

  gulp.src(jsSources)
    .pipe(concat('script.js'))
    
    .pipe(browserify({
      insertGlobals : true,
      debug : !gulp.env.production
    }))

    //.pipe(uglify())
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(connect.reload())
});

/*
 * Generate css files in prod mode
 */
gulp.task('css_prod', function() {
  del(outputDir + 'css/stylec.css');

  gulp.src(cssSources)
    .pipe(concat('stylec.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest(outputDir + 'css'))
    .pipe(connect.reload())
});

/*
 * Generate css files in dev mode
 */
gulp.task('css', function() {
  del(outputDirDev + 'css/stylec.css');

  gulp.src(cssSources)
    .pipe(concat('stylec.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest(outputDirDev + 'css'))
    .pipe(connect.reload())
});


// /*
//  * Generate bower files
//  */
// gulp.task('bower', function() {
//   del(outputDir + 'libs/**/**');
//   del(outputDirDev + 'libs/**/**');
//
//   gulp.src(bowerSources)
//     .pipe(gulp.dest(outputDir + 'libs'))
//     .pipe(connect.reload());
//
//     gulp.src(bowerSources)
//       .pipe(gulp.dest(outputDirDev + 'libs'))
//       .pipe(connect.reload());
// });


/*
 * Generate sass files in dev mode
 */
gulp.task('compass', function() {
  del(outputDirDev + 'css/style.css');

  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      image: outputDirDev + 'images',
      style: 'expanded'
    })
    .on('error', gutil.log))
    .pipe(gulp.dest(outputDirDev + 'css'))
    .pipe(connect.reload())
});

/*
 * Generate sass files in prod mode
 */
gulp.task('compass_prod', function() {
  del(outputDir + 'css/style.css');

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
    root: outputDirDev,
    livereload: true
  });
});

/*
 * Generate json  files in dev mode
 */

gulp.task('json', function() {
  gulp.src('components/scripts/*.json')
    .pipe(gulp.dest(outputDirDev + 'js'))
    .pipe(connect.reload())
});

/*
 * Generate sass files in prod mode
 */
gulp.task('json_prod', function() {
  gulp.src('components/scripts/*.json')
    .pipe(jsonminify())
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(connect.reload())
});


/*
 * Generate images files in dev mode
 */
gulp.task('images', function() {
  gulp.src('components/images/**/*.*')
    .pipe(gulp.dest(outputDirDev + 'images'))
    .pipe(connect.reload())
});

/*
 * Generate images files in prod mode
 */
gulp.task('images_prod', function() {
  gulp.src('components/images/**/*.*')
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

  gulp.start('js',  'json', 'css', 'compass', 'images', 'connect', 'html', 'xml', 'views');

  // gulp.watch('bower_components/**/*.*', ['bower']);
  gulp.watch('components/html/*.xml', ['xml']);
  gulp.watch('components/html/*.html', ['html']);
  gulp.watch('components/views/*.html', ['views']);
  gulp.watch(jsSources, ['js']);
  gulp.watch('components/js/*.json', ['json']);
  gulp.watch('components/css/*.css', ['css']);
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

  gulp.start('js_prod', 'json_prod', 'css_prod', 'compass_prod', 'images_prod', 'xml_prod', 'html_prod', 'views_prod');

  gulp.watch('components/html/*.html', ['html_prod']);
  gulp.watch('components/html/*.xml', ['xml_prod']);
  gulp.watch('components/views/*.html', ['views_prod']);
  gulp.watch(jsSources, ['js_prod']);
  gulp.watch('components/js/*.json', ['json_prod']);
  gulp.watch('components/css/*.css', ['css_prod']);
  gulp.watch('components/sass/*.scss', ['compass_prod']);
  gulp.watch('components/images/*.*', ['images_prod']);
});


gulp.task('default', function() {
  gulp.start('prod', 'dev');
});
