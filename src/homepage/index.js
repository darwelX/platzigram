var page = require('page');
// utilizada para el uso de templates
var yo  = require('yo-yo');
// utilizada como helper para usar en conjunto con yo-yo
var empty = require('empty-element');
// contiene el template html de la pagina
var template = require('./template');
var title = require('title');
var request = require('superagent');
var header = require('../header');
var axios = require('axios');

/**
 * En esta ruta se utilizaron varias funciones Middleware
 * para realizar diferentes tareas entre ellas estan
 * crear el header y cargar las fotografias.
 */
page('/', header, loadPictures,function(ctx, next){
  title('Platzigram');
  var main = document.getElementById('main-container');
  empty(main).appendChild(template(ctx.pictures));
});

/**
 * Esta es una funcion Middleware que se crean para 
 * ejecutar cierto codigo y luego llamar a la siguiente
 * funcion middleware con la instruccion next()
 * @param {*} ctx 
 * @param {*} next 
 */
function loadPictures(ctx, next){
  request
    .get('/api/pictures')
    .end(function (err, res){
      if (err) return console.log(err);

      ctx.pictures = res.body;
      next();
    })
}

/**
 * Esta funcion se puede utilizar en lugar de loadPictures
 * la diferencia radica en que se utiliza la libreria axion
 * que usa promesas en lugar de callbacks
 * @param {*} ctx 
 * @param {*} next 
 */
function loadPicturesAxios(ctx, next){
  axios
    .get('/api/pictures')
    .then(function (response){
      ctx.pictures = response.data;
      next();
    })
    .catch(function(err){
      console.log(err);
    });
}