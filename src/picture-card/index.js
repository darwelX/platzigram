var yo = require('yo-yo');
var moment = require('moment');
var translate = require('../translate');
var rf = new IntlRelativeFormat('es');
// var rf = new IntlRelativeFormat('en-US'); para mostrar textos en ingles
//  moment(picture.createdAt).fromNow() esta linea se utiliza para traducir fechas a fechas relativas pero en lugar de usar moment se usara intl-relativeformat
module.exports = function pictureCard(pic){
  var el;

  function render(picture){
      return yo`<div class="card ${picture.liked ? 'liked':''}">
      <div class="card-image">
        <img class="activator" src="${picture.url}">
      </div>
      <div class="card-content">
        <a href="/${picture.user.username}" class="card-title">
          <img src="${picture.user.avatar}" class="avatar"/>
          <span class="username">${picture.user.username}</span>
        </a>
        <small class="right time">${translate.date.format(picture.createdAt)}</small>
        <p>
          <a class="left" href="#" onclick=${like.bind(null, true)}><i class="fa fa-heart-o"></i></a>
          <a class="left" href="#" onclick=${like.bind(null, false)}><i class="fa fa-heart"></i></a>
          <span class="left likes">${translate.message('likes', { likes: picture.likes})}</span>
        </p>
      </div>
    </div>`;
  }

  // like.bind(null, true)
  // este llamado se realiza de esta forma ya que de la manera tradicional
  // la funcion se ejecutaria infinitamente, al usar bind nos retorna una referencia 
  // a la funcion pero con el parametro cambiado segun lo necesite
  function like(liked){
    pic.liked = liked;
    pic.likes += liked ? 1 : -1;
    var newEl = render(pic);
    yo.update(el, newEl);
    return false;
  }

  el = render(pic);
  return el;
}