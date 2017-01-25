import items from './routers/items';
import categorys from './routers/categorys';
import carts from './routers/carts';

export default function (app) {
    app.use('/item', items);
    app.use('/category', categorys);
    app.use('/cart', carts);

}