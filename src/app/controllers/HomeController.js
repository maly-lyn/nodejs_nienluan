//Models
var Product = require("../models/product");
const { multipleMongooseToObject } = require ('../../util/mongoose');
const { mongooseToObject } = require ('../../util/mongoose');

function getCartCnt(req) {
    let cnt = 0;
    if (!req.session.cart) req.session.cart = {};
    Object.keys(req.session.cart).forEach(k => {
        cnt += req.session.cart[k];
    });
    return cnt;
}

class HomeController {

    //[GET] /
    index (req, res, next) {        
        Product.find({})
          .then(products => {
            let stuff = multipleMongooseToObject(products);
            let newProducts = [];
            for (let i = 0; i < 4; ++i) newProducts.push(stuff[i]);
              res.render('home', { 
                  products: multipleMongooseToObject(products),
                  new: newProducts,
                  cart_cnt: getCartCnt(req)
              });
          })
          .catch(next);
    }

    // [GET] /product
    product (req, res, next) {
        let sendBody = {};
        
        Product.findById(req.params.id)
            .then (product => {
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

    getCartProducts(req, res, next) {
        return req.session.cart;
    }

    //[GET] /cart
    cart (req, res, next) {
        if (!req.session.cart) req.session.cart = {};
        Product.find({})
          .then(products => {
            let stuff = multipleMongooseToObject(products);
            let cartProducts = [];
            let similarProducts = [];
            let total = 0;
            for (let i = 0; i < 4; ++i) similarProducts.push(stuff[i]);
            
            stuff.forEach(item => {
                if (req.session.cart[item._id]) {
                    item.Quantity = req.session.cart[item._id];
                    for (let i = 0; i<= item.Quantity; ++i) total = item.Price * item.Quantity;
                    cartProducts.push(item);
                }
            });

            res.render('cart', { 
                products: cartProducts, 
                similars: similarProducts,
                cart_cnt: getCartCnt(req)
            });
          })
          .catch(next);
    }

    addToCart(req, res, next) {
        if (!req.session.cart)
            req.session['cart'] = {};

        if (!req.session.cart[req.body.id])
            req.session.cart[req.body.id] = 0;

        req.session.cart[req.body.id] += req.body.amount;

        if (req.session.cart[req.body.id] <= 0)
            delete req.session.cart[req.body.id];
        
        res.send('ok');
    }

    // [GET] /contact
    contact (req, res, next) {
        Product.find({})
          .then(products => {
            let stuff = multipleMongooseToObject(products);
            let newProducts = [];
            for (let i = 0; i < 4; ++i) newProducts.push(stuff[i]);
              res.render('contact', { 
                  products: multipleMongooseToObject(products),
                  new: newProducts,
                  cart_cnt: getCartCnt(req)
              });
          })
          .catch(next);
    }
}

module.exports = new HomeController;

