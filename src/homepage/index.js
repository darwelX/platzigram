var page = require('page');
// utilizada para el uso de templates
var yo  = require('yo-yo');
// utilizada como helper para usar en conjunto con yo-yo
var empty = require('empty-element');
// contiene el template html de la pagina
var template = require('./template');
var title = require('title');

page('/', function(ctx, next){
  title('Platzigram');
  var main = document.getElementById('main-container');
  var pictures = [
    {
      user: {
        username: 'darwelX',
        avatar: 'https://pickaface.net/assets/images/slides/slide2.png'
      },
      url: 'http://materializecss.com/images/office.jpg',
      likes: 340,
      liked: true
    },
    {
      user: {
        username: 'darwelX',
        avatar: 'https://pickaface.net/assets/images/slides/slide2.png'
      },
      url: 'http://materializecss.com/images/office.jpg',
      likes: 340,
      liked: true
    }    
  ];
  empty(main).appendChild(template(pictures));
});