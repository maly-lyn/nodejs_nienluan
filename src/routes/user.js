//const app = express()
const express = require('express');
const router = express.Router()

// app.use(express.urlencoded({
//   extended: true
// }));
// app.use(express.json());

const Joi = require('joi')
const passport = require('passport')
 
const User = require('../models/user')

const authController = require ('../app/controllers/AuthController');

router.use('/register', authController.register);
router.use('/login', authController.login);
router.use('/admin', authController.index);

// a middleware function with no mount path. This code is executed for every request to the router
// router.use(function (req, res) {
//     console.log(req.body)
//     res.send(' ')
//   })

//validation schema
 
const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
  confirmationPassword: Joi.any().valid(Joi.ref('password')).required()
})
 
router.route('/register')
  .get((req, res) => {
    res.render('register')
  })
  .post(async (req, res, next) => {
    try {
      const result = Joi.validate(req.body, userSchema)
      if (result.error) {
        req.flash('error', 'Data entered is not valid. Please try again.')
        res.redirect('/users/register')
        return
      }
 
      const user = await User.findOne({ 'email': result.value.email })
      if (user) {
        req.flash('error', 'Email is already in use.')
        res.redirect('/users/register')
        return
      }
 
      const hash = await User.hashPassword(result.value.password)
 
      delete result.value.confirmationPassword
      result.value.password = hash
 
      const newUser = await new User(result.value)
      await newUser.save()
 
      req.flash('success', 'Registration successfully, go ahead and login.')
      res.redirect('/users/login')
 
    } catch(error) {
      next(error)
    }
  })

   
module.exports = router;