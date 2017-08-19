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
var spiner = require('../spiner');
var Webcams = require('webcamjs');
var picture = require('../picture-card');


/**
 * En esta ruta se utilizaron varias funciones Middleware
 * para realizar diferentes tareas entre ellas estan
 * crear el header y cargar las fotografias.
 */
page('/', header, spiner, loadPictures, function(ctx, next){
  title('Platzigram');
  var main = document.getElementById('main-container');
  empty(main).appendChild(template(ctx.pictures));

  const uploadButton = $('#uploadButton');
  const cancelButton = $('#cancelPicture');
  const shootButton = $('#shoot');
  const previewPicture = $('#picture-preview');
  const camaraInput = $('#camara-input');

  $('.modal-trigger').modal({
    ready: function (modal, trigger){
      Webcams.attach('#camara-input');
    },
    complete: function (){
      Webcams.reset();
    }
  });
  $('#launch').modal({
    ready: function (modal, trigger){
      console.log('listo');
    },
    complete: function (){
      console.log('adios');
      Webcams.reset();
    }
  });
  $('#launch').click(function(eve){
    eve.preventDefault();
    $('.modal').modal();
    Webcams.on( 'load', function() {
		  console.log('cargado');
    });
    Webcams.set({
		width: 320,
		height: 240
    });
    Webcams.attach('#camara-input');
    shootButton.click((eve) => {
      Webcams.snap( (data_uri) => {
        previewPicture.html(`<img src="${data_uri}"/>`);
        previewPicture.removeClass('hide');
        uploadButton.removeClass('hide');
        cancelButton.removeClass('hide');
        shootButton.addClass('hide');
        camaraInput.addClass('hide');
        ///uploadButton.off('click');
        uploadButton.click(function (eve){
          const pic = {
            url: data_uri,
            likes: 0,
            liked: false,
            createAt: +new Date(),
            user: {
              username: 'darwelX',
              avatar: 'https://pickaface.net/assets/images/slides/slide2.png'
            }
          }

          $('#picture-card').prepend(picture(pic));
          $('.modal').modal('close');
          reset();
          Webcams.reset();
        });
      });
    });

    cancelButton.click((eve) => {
      reset();
    });
    
    function reset(){
      previewPicture.addClass('hide');
      uploadButton.addClass('hide');
      cancelButton.addClass('hide');
      shootButton.removeClass('hide');
      camaraInput.removeClass('hide');
    }
  });
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

function loadPicturesFetch(ctx, next){
  fetch('/api/pictures')
    .then(function(res){
      return res.json();
    })
    .then(function(res){
      ctx.pictures = res;
      next();
    })
    .catch(function(err){
      console.log(err);
    })
}

async function asyncLoad(ctx, next){
  try{
    ctx.pictures = await fetch('/api/pictures').then( res => res.json());
    next();
  }catch(err){
    return console.log(err);
  }
}