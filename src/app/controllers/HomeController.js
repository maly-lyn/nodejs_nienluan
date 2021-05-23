//Models
var Product = require("../models/product");
const { multipleMongooseToObject } = require ('../../util/mongoose');
const { mongooseToObject } = require ('../../util/mongoose');
class HomeController {

    //[GET] /
    index (req, res, next) {
        Product.find({})
          .then(products => {
              res.render('home', { 
                  products: multipleMongooseToObject(products)
              });
          })
          .catch(next);
    }

    // [GET] /product
    product (req, res, next) {
        let sendBody = {};
        
        Product.findById(req.params.id)
            .then (product => {
                console.log(product);
                sendBody.product = mongooseToObject(product);

                Product.find({})
                    .then(products => {
                        sendBody.products = multipleMongooseToObject(products);
                        res.render('product', sendBody);
                    })
                    .catch(next);
              })
              .catch (next);
    }

    //[GET] /cart
    cart (req, res) {
        res.render('cart');
    }

    // //[GET] /add-to-cart/:id 
    // addToCart (req, res, next) {
    //     var productId = req.params.id;
    //     var cart = new Cart(req.cart);
    // }

    // [GET] /contact
    contact (req, res) {
        res.render('contact');
    }
}

module.exports = new HomeController;

