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
        Cart.findById({_id: cartId}, function (e, item) {
            if (e) {
                res.next(e);
            }
            if (!item) {
                return res.sendStatus(constant.httpCode.NOT_FOUND);
            }
            return res.status(constant.httpCode.OK).send(item);
        });

    }

    getAll(req, res, next) {
        async.series({
            items: (done)=> {
                Cart.find({})
                    .populate('Item')
                    .exec(done)
            },
            totalCount: (done)=> {
                Cart.count(done);
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
        Cart.findByIdAndRemove({_id: cartId}, function (err, item) {
            if (err) {
                res.next(err);
            }
            if (!item) {
                return res.sendStatus(constant.httpCode.NOT_FOUND);
            }
            res.sendStatus(constant.httpCode.NO_CONTENT);
        })
    }

    update(req, res, next) {
        var cartId = req.params.id;
        Cart.findByIdAndUpdate({
            _id: cartId
        }, req.body, function (e, item) {
            if (e) {
                res.next(e);
            }
            if (!item) {
                return res.sendStatus(constant.httpCode.NOT_FOUND);
            }
            res.status(constant.httpCode.NO_CONTENT).send(item);
        })

    }

}

module.exports = CartController;