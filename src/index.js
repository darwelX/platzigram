// utilizada para el manejo de rutas
var page = require('page');
require('moment/locale/es');

require('./homepage');
require('./signup');
require('./signin');
page.start();