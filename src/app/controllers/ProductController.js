//Models
var Product = require("../models/product");

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

    //[GET] /list-product
    list(req, res, next) {
        Product.find({})
            .then(products => {
                products = products.map(product => product.toObject())
                res.render("sanpham/list", { products });
            })
            .catch(next);
    }
    //[GET] /add-product
    add(req, res) {
        res.render("sanpham/add");
    }
    edit(req, res) {
        res.render("sanpham/edit");
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
                    res.json({"kq":1});
                  }
                })
            }
      
          }
        );

    }
}

module.exports = new ProductController;
