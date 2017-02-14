var Category = require('../model/category');
const constant = require('../config/constant');
const async = require('async');

class CategoryController {
    create(req, res, next) {
        Category.create(req.body, (err, item) => {
            if (err) {
                return res.next(err);
            }
            return res.status(constant.httpCode.CREATED).send(item);
        });
    }

    getOne(req, res, next) {

        var categoryId = req.params.id;
        Category.findOne({_id: categoryId}, function (e, item) {
            if (e) {
                res.next(e);
            }
            if (!item) {
                return res.sendStatus(constant.httpCode.NOT_FOUND);
            }
            res.status(constant.httpCode.OK).send(item);
        });
    }

    getAll(req, res, next) {
        async.series({
            items: (cb)=> {
                Category.find({}, cb)

            },
            totalCount: (cb)=> {
                Category.count(cb);
            }
        }, (err, result)=> {
            if (err) {
                return next(err);
            }
            return res.status(constant.httpCode.OK).send(result);
        });
    }

    delete(req, res, next) {
        var categoryId = req.params.id;
        Category.remove({_id: categoryId}, function (err, item) {
            if (err) {
                return res.next(err);
            }
            if (!item) {
                return res.sendStatus(constant.httpCode.NOT_FOUND);
            }
            res.sendStatus(constant.httpCode.NO_CONTENT);
        })
    }

    update(req, res, next) {
        var categoryId = req.params.id;

        Category.update({
            _id: categoryId
        }, req.body, function (e, item) {
            if (e) {
                return res.next(e);
            }
            if (!item) {
                return res.sendStatus(constant.httpCode.NOT_FOUND);
            }
            res.status(constant.httpCode.NO_CONTENT).send(item);

        })

    }
}

module.exports = CategoryController;