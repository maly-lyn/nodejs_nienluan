
class HomeController {

    //[GET] /
    index (req, res) {
        res.render('home');
    }

    // [GET] /product
    product (req, res) {
        res.render('product');
    }

    // [GET] /category
    category (req, res) {
        res.render('category');
    }

    //[GET] /cart
    cart (req, res) {
        res.render('cart');
    }

    // [GET] /contact
    contact (req, res) {
        res.render('contact');
    }
}

module.exports = new HomeController;
