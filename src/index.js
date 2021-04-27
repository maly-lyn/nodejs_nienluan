const path = require ('path')
const express = require('express')
const morgan = require('morgan')
const handlebars  = require('express-handlebars')
const app = express()
const port = 2002

app.use(express.static(path.join(__dirname, 'public/client-template/')));     
app.use(express.static(path.join(__dirname, 'public/admin-template/')));          
// HTTP logger
app.use(morgan('combined'))

// Template engine
app.engine('hbs', handlebars({
    extname: '.hbs'
}))
app.set('view engine', 'hbs');
app.set('views', [path.join(__dirname, 'resources/views/admin/'),
                  path.join(__dirname, 'resources/views/client/')]);

const route = require ('./routes');

app.use(express.urlencoded({
  extended: true
}));

// Routes init 
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})