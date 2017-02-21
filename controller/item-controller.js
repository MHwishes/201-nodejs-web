const Item = require('../model/item');
const constant = require('../config/constant');
const async = require('async');

class ItemController {

    create(req, res, next) {
        Item.create(req.body, (err, item) => {
            if (err) {
                res.next(err);
            }
            return res.status(constant.httpCode.CREATED).send(item);
        });
    }


    getAll(req, res, next) {
        async.series({
            items: (done)=> {
                Item.find({})
                    .populate('Category')
                    .exec(done)
            },
            totalCount: (done)=> {
                Item.count(done);
            }
        }, (err, result)=> {
            if (err) {
                return next(err);
            }
            return res.status(constant.httpCode.OK).send(result);
        });
    }

    getOne(req, res, next) {
        var itemId = req.params.id;

        Item.findById({_id: itemId}, function (e, item) {
            if (e) {
                res.next(e);
            }
            if (!item) {
                return res.sendStatus(constant.httpCode.NOT_FOUND);
            }
            return res.status(constant.httpCode.OK).send(item);
        });

    }

    delete(req, res, next) {
        async.waterfall([(done)=> {
            Item.findOne({_id: req.params.id}, (e, item)=> {
                if (e) {
                    done(true, null);
                }
                else {
                    Item.findByIdAndRemove({_id: req.params.id}, (err, doc)=> {
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
        var itemId = req.params.id;
        Item.findByIdAndUpdate({
            _id: itemId
        }, req.body, function (e, item) {
            if (e) {
                res.next(e)
            }
            if (!item) {
                return res.sendStatus(constant.httpCode.NOT_FOUND);
            }
            res.status(constant.httpCode.NO_CONTENT).send(item);
        })
    }
}

module.exports = ItemController;
