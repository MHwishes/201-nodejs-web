const {Router} =require('express');
const ItemController = require('../../controller/ItemController');

const router = Router();
const itemCtrl = new ItemController();

router.delete('/:id', itemCtrl.deleteOneItem);
router.put('/:id', itemCtrl.updateOneItem);
router.get('/', itemCtrl.getAll);
router.get('/:id', itemCtrl.getOneItem);
router.post('/', itemCtrl.addNewItem);

module.exports = router;