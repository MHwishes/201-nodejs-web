import Cart from '../models/cart';

export default class CartController {
    addNewCart(req, res, next) {
        var newCart = {
            cartId: req.body.cartId,
            items: req.body.items
        };
        var cart = new Cart(newCart);
        cart.save(function (e, item) {
            if (e) {
                res.status(400).end();
            }

            res.status(201).send(item);

        });
    }

    getOneCart(req, res, next) {
        var cartId = req.params.id;
        Cart.findOne({cartId: cartId}, function (e, item) {
            if (e) {
                res.status(404).end();
            }
            res.status(200).send(item);
        });

    }

    getAllCarts(req, res, next) {
        Cart.find(function (err, item) {
            if (err) {
                res.status(404).end();
            }
            res.status(200).send(item);
        })
    }

    deleteOneCart(req, res, next) {
        var cartId = req.params.id;
        Cart.remove({cartId: cartId}, function (err, item) {
            if (err) {
                res.status(400).end();
            }
            res.status(204).end();
        })
    }

    updateOneCart(req, res, next) {
        var cartId = req.params.id;
        var items = req.body.items;

        Cart.update({
            cartId: cartId
        }, {items: items}, function (e, item) {
            if (e) {
                res.sendStatus(400).end();
            }
            res.status(204).send(item);
        })

    }

}