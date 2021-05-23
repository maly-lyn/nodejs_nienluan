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
      var product = {
        Name: req.body.nameProduct,
        Describe: req.body.describeProduct,
        Quantity: req.body.quantityProduct,
        Price: req.body.priceProduct
      };

      if (req.file) product.Image = req.file.filename;
      
      Product.updateOne({ _id: req.params.id }, product)
          .then(() => res.redirect('/list-product'))
          .catch(next);
  }

  //[DELETE] /products/:id
  destroy (req, res, next) {
    Product.find({ _id: req.params.id }).remove().exec();
    res.redirect('/list-product');
  }

  //[POST] /handle-add-product
  upload(req, res, next) {
    console.log(req.file);

    var product = Product ({
      Name: req.body.nameProduct,
      Image: req.file.filename,
      Describe: req.body.describeProduct,
      Quantity: req.body.quantityProduct,
      Price: req.body.priceProduct
    });
    
    product.save();

    res.redirect('/list-product');
  }
}

module.exports = new ProductController;
