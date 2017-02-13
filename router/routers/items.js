const {Router} =require('express');
const ItemController = require('../../controller/item-controller');

const router = Router();
const itemCtrl = new ItemController();

router.delete('/:id', itemCtrl.delete);
router.put('/:id', itemCtrl.update);
router.get('/', itemCtrl.getAll);
router.get('/:id', itemCtrl.getOne);
router.post('/', itemCtrl.create);

module.exports = router;