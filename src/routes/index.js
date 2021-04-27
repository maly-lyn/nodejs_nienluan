const homeRouter = require('./home');
const customerRouter =  require('./customer');

function route(app) {

    app.use ('/checkout', customerRouter);

    app.use('/', homeRouter);

}

module.exports = route;