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
            items: (cb)=> {
                Item.find({})
                    .populate('Category')
                    .exec(cb)
            },
            totalCount: (cb)=> {
                Item.count(cb);
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

        Item.findOne({_id: itemId}, function (e, item) {
            if (e) {
                res.next(e);
            }
            res.status(constant.httpCode.ok).send(item);
        });

    }

    delete(req, res, next) {
        var itemId = req.params.id;
        Item.remove({
            _id: itemId
        }, function (e, item) {
            if (e) {
                res.next(e);
            }
            res.sendStatus(constant.httpCode.NO_CONTENT);
        })
    }

    update(req, res, next) {
        var itemId = req.params.id;
        Item.update({
            _id: itemId
        }, req.body, function (e, item) {
            if (e) {
                res.next(e)
            }
            res.status(constant.httpCode.NO_CONTENT).send(item);
        })
    }
}

module.exports = ItemController;
