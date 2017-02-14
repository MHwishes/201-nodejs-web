const Cart = require('../model/cart');
const constant = require('../config/constant');
const async = require('async');

class CartController {
    create(req, res, next) {
        Cart.create(req.body, (err, item) => {
            if (err) {
                return res.next(err);
            }
            return res.status(constant.httpCode.CREATED).send(item);
        });
    }

    getOne(req, res, next) {
        var cartId = req.params.id;
        Cart.findOne({_id: cartId}, function (e, item) {
            if (e) {
                res.next(e);
            }
            res.status(constant.httpCode.OK).send(item);
        });

    }

    getAll(req, res, next) {
        async.series({
            items: (cb)=> {
                Cart.find({})
                    .populate('Item')
                    .exec(cb)
            },
            totalCount: (cb)=> {
                Cart.count(cb);
            }
        }, (err, result)=> {
            if (err) {
                return next(err);
            }
            return res.status(constant.httpCode.OK).send(result);
        });
    }

    delete(req, res, next) {
        var cartId = req.params.id;
        Cart.remove({_id: cartId}, function (err, item) {
            if (err) {
                res.next(err);
            }
            res.sendStatus(constant.httpCode.NO_CONTENT);
        })
    }

    update(req, res, next) {
        var cartId = req.params.id;
        Cart.update({
            _id: cartId
        }, req.body, function (e, item) {
            if (e) {
                res.next(e);
            }
            res.status(constant.httpCode.NO_CONTENT).send(item);
        })

    }

}

module.exports = CartController;