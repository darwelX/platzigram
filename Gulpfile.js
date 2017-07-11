var gulp  = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
// usada para unir el codigo javascript de nuestras dependencias
// junto con el codigo javasccript generado por nosotros
var browserify = require("browserify");
// se usa como herramienta auxiliar para procesar el resultado
// que retorna browserify para que lo maneje gulp
var source = require('vinyl-source-stream');
// esta herramienta se combina con el uso de browserify
var babel = require('babelify');
var watchify = require('watchify');

gulp.task('styles', function (){
  gulp
    .src('index.scss')
    .pipe(sass())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('public'));
});

gulp.task('assets', function(){
  gulp.src('assets/*')
  .pipe(gulp.dest('public'))
});

function compile(watch){
  var bundle = watchify(browserify('./src/index.js'));

  function rebundle(){
    bundle
      .transform(babel, {presets: ['es2015']})
      .bundle()
      .pipe(source('index.js'))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('public'));
  }

  if(watch){
    bundle.on('update', function(){
      console.log('--> Bundling...');
      rebundle();
    });
  }

  rebundle();
};

gulp.task('build', function(){
  return compile();
});

gulp.task('watch', function(){
  return compile(true);
});

gulp.task('default', ['styles', 'assets', 'build']);