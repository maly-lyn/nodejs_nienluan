const express = require('express');
const router = express.Router();

const customerController = require ('./app/controllers/CustomerController');
const homeController = require ('./app/controllers/HomeController');
const productController = require ('./app/controllers/ProductController');
const authController = require ('./app/controllers/AuthController');

function route(app) {

    router.get("/checkout", customerController.checkout);

    router.get('/', homeController.index);
    router.get('/product/:id', homeController.product);
    router.get('/cart', homeController.cart);
    //router.post('/delete-cart', homeController.deleteInCart);
    app.post('/add-to-cart', homeController.addToCart);
    router.get('/get-cart-products', homeController.getCartProducts);
    router.get('/contact', homeController.contact);
    router.get('/signup', homeController.signup);

    router.get('/list-product', productController.list);
    router.get('/add-product', productController.add);
    router.post('/handle-add-product', productController.multerUpload.single("productImage"), productController.upload);
    router.get('/products/:id/edit-product', productController.edit);
    router.put('/products/:id', productController.multerUpload.single("productImage"), productController.update);
    router.delete('/products/:id', productController.destroy);

    router.get('/register', authController.register);
    router.post('/handle-register', authController.handleRegister);
    router.get('/login', authController.login);
    router.post('/handle-login', authController.handleLogin);
    router.get('/admin', authController.index);

    app.use ('/', router);
}

module.exports = route;