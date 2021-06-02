var User = require("../models/user");
const { multipleMongooseToObject } = require ('../../util/mongoose');
const { mongooseToObject } = require ('../../util/mongoose');
class AuthController {

    //[GET] /
    index (req, res) {
        res.render('index');
    }

    // [GET] /register
    register (req, res) {
        res.render('register');
    }

    handleRegister(req, res, next) {
        console.log(req.body);
    
        var user = User ({
            FullName: req.body.fullname,
            Email: req.body.email,
            Address: req.body.address,
            City: req.body.city,
            UserName: req.body.username,
            PassWord: req.body.password,
            Office: req.body.office
        });
        
        user.save();
    
        res.redirect('/admin');
      }
    // [GET] /login
    login (req, res) {
        res.render('login');
    }

    handleLogin (req, res, next) 
    {
        let username = req.body.username;
        let password = req.body.password;
        console.log(username);
        console.log(password);
        if (username === 'maly' && password === '123')
            res.render ('index');
        else res.send('Bạn không phải người quản trị nên không thể truy cập')
    }

}

module.exports = new AuthController;
