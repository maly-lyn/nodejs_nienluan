const homeRouter = require('./home');
const customerRouter =  require('./customer');
const authRouter = require ('./user');

function route(app) {

    app.use ('/checkout', customerRouter);

    app.use ('/user', authRouter);

    app.use ('/', homeRouter);
    
}

module.exports = route;