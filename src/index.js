const path = require ('path')
const express = require('express')
const morgan = require('morgan')
const handlebars  = require('express-handlebars')
const app = express()
const port = 2002

app.use(express.static(path.join(__dirname, 'public')))
// HTTP logger
app.use(morgan('combined'))

// Template engine
app.engine('hbs', handlebars({
    extname: '.hbs'
}))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/trang-chu', (req, res) => {
  res.render('home');
})

app.get('/san-pham', (req, res) => {
  res.render('product');
})

app.get('/loai-san-pham', (req, res) => {
  res.render('category');
})

app.get('/gio-hang', (req, res) => {
  res.render('cart');
})

app.get('/thanh-toan', (req, res) => {
  res.render('checkout');
})

app.get('/lien-he', (req, res) => {
  res.render('contact');
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})