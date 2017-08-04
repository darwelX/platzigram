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
app.get('/api/user/:username', function(req, res){
  const user = {
    username: 'darwelX',
    avatar: 'https://pickaface.net/assets/images/slides/slide2.png',
    pictures: [
      {
        id: 1,
        src: 'http://www.khamliatour.com/wp-content/uploads/2017/03/estudiantes-marruecos-2017-1024x682.jpg',
        likes: 3
      },
      {
        id: 2,
        src: 'http://elvenezolanonews.com/wp-content/uploads/2017/07/estudiantes.jpg',
        likes: 30
      },
      {
        id: 3,
        src: 'http://www.residenciasantandreu.com/wp-content/uploads/2014/06/residencia_estudiantes_granada.jpg',
        likes: 14
      },
      {
        id: 4,
        src: 'http://elvenezolanonews.com/wp-content/uploads/2017/07/estudiantes.jpg',
        likes: 22
      },
      {
        id: 5,
        src: 'http://www.primicias24.com/wp-content/uploads/2016/09/becas-para-estudiantes-en-el-extranjero.jpg',
        likes: 6
      },
      {
        id: 6,
        src: 'http://www.malaga2013.cgcoo.es/uploads/images/7723840-gran-grupo-de-estudiantes-sonrientes-aislados-sobre-fondo-blanco.jpg',
        likes: 8
      }

    ]
  }

  res.send(user);
});
app.get('/:username', function(req, res){
  res.render('index', {title: `Platzigram - ${req.params.username}`});
});
app.get('/:username/:id', function(req, res){
  console.log('aqui');
  res.render('index', {title: `Platzigram - ${req.params.username}`});
});
app.listen(3000, function(err){
  if(err){
    console.log('Hubo un error'), process.exit(1);
  }
  console.log('Plazigram escuchando en el puerto 3000');
});