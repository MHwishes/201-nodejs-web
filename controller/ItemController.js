var Item = require('../models/item');

class ItemController {

    addNewItem(req, res, next) {

        var newItem = {
            id: req.body.id,
            name: req.body.name
        };
        var item = new Item(newItem);
        item.save(function (e, item) {
            if (e) {
                res.status(400).end();
            }
            res.status(201).send(item);

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

        Item.findOne({id: itemId}, function (e, item) {
            if (e) {
                res.status(404).end();
            }
            res.status(200).send(item);
        });

    }

    deleteOneItem(req, res, next) {
        var itemId = req.params.id;
        Item.remove({
            id: itemId
        }, function (e, item) {
            if (e) {
                res.status(400).end();
            }
            res.status(204).end();
        })
    }

    updateOneItem(req, res, next) {
        var itemId = req.params.id;
        var itemName = req.body.name;

        Item.update({
            id: itemId
        }, {name: itemName}, function (e, item) {
            if (e) {
                res.sendStatus(400).end();
            }
            res.status(204).send(item);
        })
    }
}

module.exports = ItemController;
