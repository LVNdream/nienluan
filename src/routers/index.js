const homeRouter = require('./home');
const fashionRouter = require('./fashionmen');
const accountRouter = require('./account');
const cartRouter = require('./cart');
const payRouter = require('./pay');
const admin = require('./admin');


function router(app) {

    
    app.use('/home', homeRouter);

    app.use('/fashion', fashionRouter);

    app.use("/account", accountRouter);

    app.use('/', cartRouter);
    app.use('/', payRouter);
    app.use('/admin', admin);

}

module.exports = router;