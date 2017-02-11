const Cart = require('../models/cart');

class CartController {
    addNewCart(req, res, next) {
        Cart.create(req.body, (err, item) => {
            if (err) {
                return res.sendStatus(400);
            }
            return res.status(201).send(item);
        });
    }

    getOneCart(req, res, next) {
        var cartId = req.params.id;
        Cart.findOne({_id: cartId}, function (e, item) {
            if (e) {
                res.sendStatus(404);
            }
            res.status(200).send(item);
        });

    }

    getAllCarts(req, res, next) {
        Cart.find(function (err, item) {
            if (err) {
                res.sendStatus(404);
            }
            res.status(200).send(item);
        })
    }

    deleteOneCart(req, res, next) {
        var cartId = req.params.id;
        Cart.remove({_id: cartId}, function (err, item) {
            if (err) {
                res.sendStatus(400);
            }
            res.sendStatus(204);
        })
    }

    updateOneCart(req, res, next) {
        var cartId = req.params.id;
        Cart.update({
            _id: cartId
        }, req.body, function (e, item) {
            if (e) {
                res.sendStatus(400);
            }
            res.status(204).send(item);
        })

    }

}

module.exports = CartController;