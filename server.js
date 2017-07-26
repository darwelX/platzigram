var express = require('express');
var multer = require('multer'); // esta libreria permite manipular archivos en el servidor
var ext = require('file-extension'); // extrae las extenciones de archivos

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})
 
var upload = multer({ storage: storage }).single('picture');
var app = express();
app.set('view engine', 'pug');
// se le dice que la carpeta esta disponible de manera estatica
app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('index', {title: 'Platzigram'});
});
app.get('/signup', function(req, res){
  res.render('index', {title: 'Platzigram - Signup'});
});
app.get('/signin', function(req, res){
  res.render('index', {title: 'Platzigram - Signin'});
});
app.get('/api/pictures', function (req, res){
  var pictures = [
    {
      user: {
        username: 'darwelX',
        avatar: 'https://pickaface.net/assets/images/slides/slide2.png'
      },
      url: 'http://materializecss.com/images/office.jpg',
      likes: 0,
      liked: false,
      createdAt: +new Date()
    },
    {
      user: {
        username: 'darwelX',
        avatar: 'https://pickaface.net/assets/images/slides/slide2.png'
      },
      url: 'http://materializecss.com/images/office.jpg',
      likes: 1,
      liked: false,
      createdAt: +new Date().setDate(new Date().getDate() - 10)
    }    
  ];
  setTimeout(function (){
    res.send(pictures);
  }, 2000);
});
app.post('/api/pictures', function(req, res){
  upload(req, res, function(err){
    if(err){
      return res.send(500, "Error uploading file");
    }
    res.send('File uploaded');
  });
});
app.listen(3000, function(err){
  if(err){
    console.log('Hubo un error'), process.exit(1);
  }
  console.log('Plazigram escuchando en el puerto 3000');
});