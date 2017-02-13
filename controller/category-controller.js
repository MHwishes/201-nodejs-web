var Category = require('./category');
const constant=require('../config/constant');

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
            res.status(constant.httpCode.OK).send(item);
        });
    }

    getAll(req, res, next) {
        Category.find(function (err, item) {
            if (err) {
                return res.next(err);
            }
            res.status(constant.httpCode.ok).send(item);
        })
    }

    delete(req, res, next) {
        var categoryId = req.params.id;
        Category.remove({_id: categoryId}, function (err, item) {
            if (err) {
                return res.next(err);
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
            res.status(constant.httpCode.NO_CONTENT).send(item);

        })

    }
}

module.exports = CategoryController;