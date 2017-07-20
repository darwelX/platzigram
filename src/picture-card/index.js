var yo = require('yo-yo');
var moment = require('moment');

module.exports = function pictureCard(pic){
  var el;

  function render(picture){
      return yo`<div class="card ${picture.liked ? 'liked':''}">
      <div class="card-image">
        <img class="activator" src="${picture.url}">
      </div>
      <div class="card-content">
        <a href="/user/${picture.user.username}" class="card-title">
          <img src="${picture.user.avatar}" class="avatar"/>
          <span class="username">${picture.user.username}</span>
        </a>
        <small class="right time">${moment(picture.createdAt).fromNow()}</small>
        <p>
          <a class="left" href="#" onclick=${like.bind(null, true)}><i class="fa fa-heart-o"></i></a>
          <a class="left" href="#" onclick=${like.bind(null, false)}><i class="fa fa-heart"></i></a>
          <span class="left likes">${picture.likes} me gusta</span>
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