const express = require('express');
const router = express.Router();

const authController = require ('../app/controllers/AuthController');

router.use('/register', authController.register);
router.use('/login', authController.login);
router.use('/admin', authController.index);

//Register User
// router.post('/register', function(req, res){
//     var fullname = req.body.fullname;
//     var address = req.body.address;
//     var email = req.body.email;
//     var city = req.body.city;
//     var gender = req.body.gender;
//     var username = req.body.username;
//     var password = req.body.password;
//     var repass = req.body.repass;
//     console.log(fullname);
// });

module.exports = router;