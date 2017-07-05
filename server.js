var express = require('express');
var app = express();
app.set('view engine', 'pug');
app.get('/', function(req, res){
  res.render('index');
});

app.listen(3000, function(err){
  if(err){
    console.log('Hubo un error'), process.exit(1);
  }
  console.log('Plazigram escuchando en el puerto 3000');
});