// var bodyParser = require ('body-parser');
//var expressValidator = require ('express-validator');
var flash = require ('connect-flash');
var session = require ('express-session');
var passport = require ('passport');
// var LocalStrategy = require ('passport-local').Strategy;
var mongo = require ('mongodb');
var mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;
// thu vien login

const path = require ('path')
const express = require('express')
const morgan = require('morgan')
const handlebars  = require('express-handlebars')
const app = express()
const port = 2002

app.use(express.static(path.join(__dirname, 'public/client-template/')));     
app.use('/static-admin', express.static(path.join(__dirname, 'public/admin-template/')));          
// HTTP logger
app.use(morgan('combined'))

//BodyParser Middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
// app.use(cookieParser());

// Template engine
app.engine('hbs', handlebars({
    extname: '.hbs'
}))
app.set('view engine', 'hbs');

// Set Static Folder 
app.set('views', [path.join(__dirname, 'resources/views/admin/'),
                  path.join(__dirname, 'resources/views/client/')]);
const route = require ('./routes');

// Express Session 
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express Validator
// app.use(expressvalidator({
//     errorFormatter: function(param, msg, value) {
//       var namespace = param.split('.')
//       , root = namespace.shift()
//       , formParam = root;
//       while(namespace.length) {
//         formParam += '[' + namespace.shift() + ']';
//       }
//       return {
//         param : formParam,
//         msg : msg,
//         value : value
//       };
//     }
// }));
// Connect Flash 
app.use(flash());

//Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// app.get('/admin', (req, res) => {
//   res.render('index');
// })

// app.get('/login', (req, res) => {
//   res.render('login');
// })

// app.get('/register', (req, res) => {
//   res.render('register');
// })


// Routes init 
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})