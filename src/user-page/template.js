import yo from 'yo-yo';
import layout from '../layout';
import translate from '../translate';
import empty from 'empty-element';

export default function userPageTemplate(user){
  var el = yo`
  <div class="container user-page">
    <div class="row">
      <div class="col s12 m10 offset-m1 l8 offsetl2 center-align  heading">
        <div class="row">
          <div class="col s12 m10 offset-m1 l3 offset-l3 center">
              <img src="${user.avatar}" alt="${user.username}" class="responsive-img circle"/>
          </div>
          <div class="col s12 m10 offset-m1 l6 left-align">
            <h2 class="hide-on-large-only center-align">${user.username}</h2>
            <h2 class="hide-on-med-and-down center-align">${user.username}</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      ${user.pictures.map(function(picture, index, arreglo){
        return yo`<div class="col s12 m6 l4">
        <a href="/${user.username}/${picture.id}" class="picture-container">
          <a href="#modal${picture.id}"><img src="${picture.src}" class="picture" /></a>
          <div class="likes"><i class="fa fa-heart"></i> ${picture.likes}</div>
        </a>
        <div id="modal${picture.id}" class="modal modal-fixed-footer">
          <div class="modal-content ">
            <a href="#" onclick=${back.bind(null, index, arreglo)}><i class="chevron fa fa-chevron-left fa-4x"></i></a>
            <img id="image${index}" src="${arreglo[index].src}"/>
            <a href="#" onclick=${next.bind(null, index, arreglo)}><i class="chevron fa fa-chevron-right fa-4x"></i></a>
          </div>
          <div class="modal-footer">
            <div class="likes" id="likes${index}">
              <i class="fa fa-heart"></i> ${translate.message('likes', { likes: picture.likes})}
            </div>
          </div>
        </div>`
      })}
    </div>
  </div>`;
  let currentPos;
  let currentIndex;
  
  function next(index, array){
    currentIndex = currentIndex == undefined ? index : currentIndex;
    currentPos = currentPos == undefined ? index : currentPos;    
    var img = document.getElementById(`image${index}`);
    var likes = document.getElementById(`likes${index}`);
    var size = array.length;
    var pos;
    if (currentPos === (size - 1) ){
      pos = 0;
      currentPos = 0;
    }else {
      currentPos++;
      pos = currentPos;
    }
    var lk = document.createElement("i");
    lk.className = 'fa fa-heart';
    empty(likes);
    likes.appendChild(lk);
    likes.insertAdjacentHTML('beforeend',` ${translate.message('likes', { likes: array[pos].likes})}`);
    img.src = array[pos].src;
    return false;
  }

  function back(index, array){
    currentIndex = currentIndex == undefined ? index : currentIndex;
    currentPos = currentPos == undefined ? index : currentPos;    
    var img = document.getElementById(`image${index}`);
    var likes = document.getElementById(`likes${index}`);
    var size = array.length;
    var pos;
    if (currentPos == 0 ){
      pos = size - 1;
      currentPos = pos;
    }else {
      currentPos--;
      pos = currentPos;
    }
    var lk = document.createElement("i");
    lk.className = 'fa fa-heart';
    empty(likes);
    likes.appendChild(lk);
    likes.insertAdjacentHTML('beforeend',` ${translate.message('likes', { likes: array[pos].likes})}`);    
    img.src = array[pos].src;    
    return false;
  }

  return layout(el);
}