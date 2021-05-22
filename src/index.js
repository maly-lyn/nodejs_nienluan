var path = require ('path');
var express = require('express');
var app = express();
var handlebars  = require('express-handlebars');
var methodOverride = require('method-override');
// var morgan = require('morgan');
const port = 2002;

const db = require('./config/db');
//Connect to DB
db.connect();

// HTTP logger
// app.use(morgan('combined'));
//Template engine
app.engine('hbs', handlebars({
  extname: '.hbs',
  helpers: require('./handlebars-helpers')
}))
app.set('view engine', 'hbs');
app.set('views', [path.join(__dirname, 'resources/views/admin/'), 
                  path.join(__dirname, 'resources/views/client/')]);                  
// // Set Static Folder 
app.use(express.static(path.join(__dirname, 'public/client-template/')));     
app.use('/static-admin', express.static(path.join(__dirname, 'public/admin-template/')));
app.use('/image', express.static(path.join(__dirname, 'public/upload')));          

//body-parser
// var bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

//Routes init 
const route = require ('./routes.js');
route(app);
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
