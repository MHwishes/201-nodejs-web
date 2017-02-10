var Category = require('../models/category');

class CategoryController {
    addNewCategory(req, res, next) {
        Category.create(req.body, (err, item) => {
            if (err) {
                return res.status(400).end();
            }
            return res.status(201).send(item);
        });
    }

    getOneCategory(req, res, next) {

        var categoryId = req.params.id;
        Category.findOne({_id: categoryId}, function (e, item) {
            if (e) {
                res.status(404).end();
            }
            res.status(200).send(item);
        });
    }

    getAllCategorys(req, res, next) {
        Category.find(function (err, item) {
            if (err) {
                res.status(404).end();
            }
            res.status(200).send(item);
        })
    }

    deleteOneCategory(req, res, next) {
        var categoryId = req.params.id;
        Category.remove({_id: categoryId}, function (err, item) {
            if (err) {
                res.status(400).end();
            }
            res.status(204).end();
        })
    }

    updateOneCategory(req, res, next) {
        var categoryId = req.params.id;

        Category.update({
            _id: categoryId
        }, req.body, function (e, item) {
            if (e) {
                res.sendStatus(400).end();
            }
            res.status(204).send(item);

        })

    }
}

module.exports = CategoryController;