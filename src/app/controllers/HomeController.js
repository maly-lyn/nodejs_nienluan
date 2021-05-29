//Models
var Product = require("../models/product");
const { multipleMongooseToObject } = require ('../../util/mongoose');
const { mongooseToObject } = require ('../../util/mongoose');

class HomeController {

    //[GET] /
    index (req, res, next) {
        let cnt = 0;
        if (!req.session.cart) req.session.cart = {};
        Object.keys(req.session.cart).forEach(k => {
            cnt += req.session.cart[k];
        });
        
        Product.find({})
          .then(products => {
              res.render('home', { 
                  products: multipleMongooseToObject(products),
                  cart_cnt: cnt
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

    addToCart(req, res, next) {
        if (!req.session.cart)
            req.session['cart'] = {};

        if (!req.session.cart[req.body.id])
            req.session.cart[req.body.id] = 0;

        req.session.cart[req.body.id] += req.body.amount;

        if (req.session.cart[req.body.id] <= 0)
            delete req.session.cart[req.body.id]

        console.log(req.session.cart);
        res.send('ok');
    }

    // [GET] /contact
    contact (req, res) {
        res.render('contact');
    }
}

module.exports = new HomeController;

