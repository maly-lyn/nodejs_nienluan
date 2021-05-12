
const express = require('express');
const router = express.Router();

const customerController = require ('../app/controllers/CustomerController');

router.use("/", customerController.checkout);

module.exports = router; 