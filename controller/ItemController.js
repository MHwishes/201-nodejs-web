var Item = require('../models/item');

class ItemController {

    create(req, res, next) {
        Item.create(req.body, (err, item) => {
            if (err) {
                return res.sendStatus(400);
            }
            return res.status(201).send(item);
        });
    }


    getAll(req, res, next) {
        Item.find(function (e, item) {
            if (e) {
                res.sendStatus(404);
            }

            res.status(200).send(item);
        });
    }

    getOne(req, res, next) {
        var itemId = req.params.id;

        Item.findOne({_id: itemId}, function (e, item) {
            if (e) {
                res.sendStatus(404);
            }
            res.status(200).send(item);
        });

    }

    delete(req, res, next) {
        var itemId = req.params.id;
        Item.remove({
            _id: itemId
        }, function (e, item) {
            if (e) {
                res.sendStatus(400);
            }
            res.sendStatus(204);
        })
    }

    update(req, res, next) {
        var itemId = req.params.id;
        Item.update({
            _id: itemId
        }, req.body, function (e, item) {
            if (e) {
                res.sendStatus(400);
            }
            res.status(204).send(item);
        })
    }
}

module.exports = ItemController;
