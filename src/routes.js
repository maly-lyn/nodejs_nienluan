const express = require('express');
const router = express.Router();

const customerController = require ('./app/controllers/CustomerController');
const homeController = require ('./app/controllers/HomeController');
const productController = require ('./app/controllers/ProductController');
const authController = require ('./app/controllers/AuthController');

function route(app) {

    router.get("/checkout", customerController.checkout);

    router.get('/', homeController.index);
    router.get('/product', homeController.product);
    router.get('/category', homeController.category);
    router.get('/cart', homeController.cart);
    router.get('/contact', homeController.contact);

    router.get("/list-product", productController.list);
    router.get("/add-product", productController.add);
    router.get("/edit-product", productController.edit);
    router.post("/handle-add-product", productController.upload);

    router.get('/register', authController.register);
    router.get('/login', authController.login);
    router.get('/admin', authController.index);

    app.use ('/', router);
}

module.exports = route;