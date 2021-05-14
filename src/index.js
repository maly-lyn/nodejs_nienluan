
var path = require ('path');
var express = require('express');
var app = express();
var handlebars  = require('express-handlebars');
var morgan = require('morgan')
// app.set("view engine", "ejs");

// HTTP logger
app.use(morgan('combined'));
//Template engine
app.engine('hbs', handlebars({
  extname: '.hbs'
}))
app.set('view engine', 'hbs');
app.set('views', [path.join(__dirname, 'resources/views/'),
                  path.join(__dirname, 'resources/views/admin/'),
                  path.join(__dirname, 'resources/views/client/')]);                  
// Set Static Folder 
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, 'public/client-template/')));     
app.use('/static-admin', express.static(path.join(__dirname, 'public/admin-template/')));          

//body-parser
var bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//multer
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/public/upload/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()  + "-" + file.originalname)
    }
});  
var upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file);
        if(file.mimetype=="image/bmp" || file.mimetype=="image/png" || file.mimetype=="image/jpg" || file.mimetype=="image/jpeg" || file.mimetype=="image/gif"){
            cb(null, true)
        }else{
            return cb(new Error('Only image are allowed!'))
        }
    }
}).single("productImage");
const port = 2002;

//Models
var Product = require("./Models/product");

app.get("/add-product", function(req, res){
  res.render("./sanpham/add");
});

app.post("/add-product", function(req, res){
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log("A Multer error occurred when uploading."); 
      } else if (err) {
        console.log("An unknown error occurred when uploading." + err);
      }else{
          res.send(req.file.filename);
      }

    });
});
//Routes init 
const route = require ('./routes');
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

