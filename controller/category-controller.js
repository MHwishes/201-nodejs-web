var Category = require('../model/category');
const Item = require('../model/item');
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
        Category.findById({_id: categoryId}, function (e, item) {
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
                Category.find({}, done)

            },
            totalCount: (done)=> {
                Category.count(done);
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
            Item.findOne({Category: req.params.id}, (e, item)=> {
                if (e) {
                    done(true, null);
                }
                else {
                    Category.findByIdAndRemove({_id: req.params.id}, (err, doc)=> {
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
        var categoryId = req.params.id;

        Category.findByIdAndUpdate({
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