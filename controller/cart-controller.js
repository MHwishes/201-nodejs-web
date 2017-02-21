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
        async.waterfall([(done)=> {
            Cart.findOne({_id: req.params.id}, (e, item)=> {
                if (e) {
                    done(true, null);
                }
                else {
                    Cart.findByIdAndRemove({_id: req.params.id}, (err, doc)=> {
                        if (!doc) {
                            return done(false, null);
                        }
                        done(err, doc);
                    })
                }
            });
        }], (err)=> {
            if (err === true) {
                return res.sendStatus(constant.httpCode.BAD_REQUEST);
            }
            if (err === false) {
                return res.sendStatus(constant.httpCode.NOT_FOUND);
            }
            if (err) {
                return next(err);
            }
            return res.sendStatus(constant.httpCode.NO_CONTENT);
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