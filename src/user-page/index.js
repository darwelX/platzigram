import page from 'page';
import header from '../header';
import title from 'title';
import empty from 'empty-element';
import template from './template';
import spiner from '../spiner';

page('/:username', header, spiner, loadUser, function(ctx, next){
  var main = document.getElementById('main-container');
  title(`Platzigram - ${ctx.params.username}`);
  empty(main).appendChild(template(ctx.user));
});

page('/:username/:id', header, spiner, loadUser, function(ctx, next){
  var main = document.getElementById('main-container');
  title(`Platzigram - ${ctx.params.username}`);
  empty(main).appendChild(template(ctx.user));
  $('.modal').modal();
  $('.modal').modal({
    ready: function() { // Callback for Modal open. Modal and trigger parameters available.
        alert("Ready");
    },
    complete: function(){
      console.log('cerro');
      let path = `/${ctx.params.username}`;
      page(path);
    }
  });
  $(`#modal${ctx.params.id}`).modal('open');
  //let path = `/${ctx.params.username}`;
  //page(path);
});
async function loadUser(ctx, next){
  try {
    ctx.user = await fetch(`/api/user/${ctx.params.username}`).then( res => res.json());
    next();
  }catch(err){
    console.log(err);
  }
}