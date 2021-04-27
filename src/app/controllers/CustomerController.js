class CustomerController {

    //[GET] /customer/checkout
    checkout(req, res) {
        res.render('checkout');
    }
}

module.exports = new CustomerController;