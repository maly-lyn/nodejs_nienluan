const express = require('express');
const router = express.Router();

const homeController = require ('../app/controllers/HomeController');

router.use('/product', homeController.product);
router.use('/category', homeController.category);
router.use('/cart', homeController.cart);
router.use('/contact', homeController.contact);
router.use('/', homeController.index);

module.exports = router;