//Models
var Product = require("../models/product");
const { multipleMongooseToObject } = require ('../../util/mongoose');
const { mongooseToObject } = require ('../../util/mongoose');
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

class ProductController {
  constructor() {

    this.multerUpload = multer({ 
      storage: storage,
      fileFilter: function (req, file, cb) {
          // console.log(file);
          if(file.mimetype=="image/bmp" || file.mimetype=="image/png" || file.mimetype=="image/jpg" || file.mimetype=="image/jpeg" || file.mimetype=="image/gif"){
              cb(null, true)
          }else{
              return cb(new Error('Only image are allowed!'))
          }
      }
    });
    
  }

  // [GET] /products/:slug
  show(req, res, next) {
      Product.findOne({ slug: req.params.slug })
            .then(product=> {
                res.json('product');
            })
            .catch (next);
  }
  //[GET] /list-product
  list(req, res, next) {
      Product.find({})
          .then(products => {
              res.render("sanpham/list", { 
                  products: multipleMongooseToObject(products)
              });
          })
          .catch(next);
  }
  //[GET] /add-product
  add(req, res) {
      res.render("sanpham/add");
  }
  //[GET] /products/:id/edit-product
  edit(req, res, next) {
      Product.findById(req.params.id)
          .then (product => {
            res.render("sanpham/edit", { 
                product: mongooseToObject(product)
            });
          })
          .catch (next)
  }

  //[PUT] /products/:id
  update(req, res, next) {
    console.log(req.body);
    console.log(req.file);
    res.json(req.body);
  }

  upload(req, res) {
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

      upload(req, res, function (err) {
          if (err instanceof multer.MulterError) {
              res.json({"kq":0, "errMsg": "A Multer error occurred when uploading."});
          } else if (err) {
              res.json({"kq":0, "errMsg": "An unknown error occurred when uploading." + err})
          }else{
              //Save Mongo (req.file.filename)
              // res.send(req.file.filename);
              var product = Product ({
                Name: req.body.nameProduct,
                Image: req.file.filename,
                Describe: req.body.describeProduct,
                Quantity: req.body.quantityProduct,
                Price: req.body.priceProduct
              });
              console.log(product);
              product.save(function(err){
                if(err){
                  res.json({"kq":0, "errMsg":err});
                }else{
                  // res.json({"kq":1});
                  res.render ("sanpham/add");
                }
              })
          }
    
        }
      );

  }
}

module.exports = new ProductController;
