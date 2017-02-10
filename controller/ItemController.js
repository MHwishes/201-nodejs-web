var Item = require('../models/item');

class ItemController {

    addNewItem(req, res, next) {
        Item.create(req.body, (err, item) => {
            if (err) {
                return res.status(400).end();
            }
            return res.status(201).send(item);
        });
    }


    getAll(req, res, next) {
        Item.find(function (e, item) {
            if (e) {
                res.status(404).end();
            }

            res.status(200).send(item);
        });
    }

    getOneItem(req, res, next) {
        var itemId = req.params.id;

        Item.findOne({_id: itemId}, function (e, item) {
            if (e) {
                res.status(404).end();
            }
            res.status(200).send(item);
        });

    }

    deleteOneItem(req, res, next) {
        var itemId = req.params.id;
        Item.remove({
            _id: itemId
        }, function (e, item) {
            if (e) {
                res.status(400).end();
            }
            res.status(204).end();
        })
    }

    updateOneItem(req, res, next) {
        var itemId = req.params.id;
        Item.update({
            _id: itemId
        }, req.body, function (e, item) {
            if (e) {
                res.sendStatus(400).end();
            }
            res.status(204).send(item);
        })
    }
}

module.exports = ItemController;
