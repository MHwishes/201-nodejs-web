var Category = require('../models/category');

export default class CategoryController {
    addNewCategory(req, res, next) {
        var newCategory = {
            categoryId: req.body.categoryId,
            categoryName: req.body.categoryName
        };
        var category = new Category(newCategory);
        category.save(function (e, item) {
            if (e) {
                res.status(400).end();
            }
            res.status(201).send(item);

        });
    }

    getOneCategory(req, res, next) {

        var categoryId = req.params.id;
        Category.findOne({categoryId: categoryId}, function (e, item) {
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
        Category.remove({categoryId: categoryId}, function (err, item) {
            if (err) {
                res.status(400).end();
            }
            res.status(204).end();
        })
    }

    updateOneCategory(req, res, next) {
        var categoryId = req.params.id;
        var categoryName = req.body.categoryName;

        Category.update({
            categoryId: categoryId
        }, {categoryName: categoryName}, function (e, item) {
            if (e) {
                res.sendStatus(400).end();
            }
            res.status(204).send(item);

        })

    }
}