
class AuthController {

    //[GET] /
    index (req, res) {
        res.render('index');
    }

    // [GET] /register
    register (req, res) {
        res.render('register');
    }

    // [GET] /login
    login (req, res) {
        res.render('login');
    }

}

module.exports = new AuthController;
