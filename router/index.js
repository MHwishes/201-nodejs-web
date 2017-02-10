const items = require('./routers/items');
const categorys = require('./routers/categorys');
const carts = require('./routers/carts');

module.exports = function (app) {
    app.use('/item', items);
    app.use('/category', categorys);
    app.use('/cart', carts);

};