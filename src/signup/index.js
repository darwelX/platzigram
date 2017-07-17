var page = require('page');
// utilizada para el uso de templates
var yo  = require('yo-yo');
// utilizada como helper para usar en conjunto con yo-yo
var empty = require('empty-element');
// contiene el template html de la pagina
var template = require('./template');
var title = require('title');

page('/signup', function(ctx, next){
  title('Platzigram - Signup');
  var main = document.getElementById('main-container');
  empty(main).appendChild(template);
});