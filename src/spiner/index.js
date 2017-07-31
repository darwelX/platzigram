var yo = require('yo-yo');
var translate = require('../translate');
var empty = require('empty-element');

var el = yo`<div class="loader">
              ${translate.message('loading')}
            </div>`;

module.exports = function(ctx, next){
  var main = document.getElementById('main-container');
  empty(main).appendChild(el);
  next();
}
