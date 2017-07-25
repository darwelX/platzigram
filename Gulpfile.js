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
  var bundle = browserify('./src/index.js', {debug: true});

  if(watch){
    var bundle = watchify(bundle);
    bundle.on('update', function(){
      console.log('--> Bundling...');
      rebundle();
    });
  }

  function rebundle(){
    bundle
      .transform(babel, {presets: ['es2015'], plugins: ['syntax-async-functions', 'transform-regenerator']})
      .bundle()
      .on('error', function (err){ console.log(err); this.emit('end')})
      .pipe(source('index.js'))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('public'));
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