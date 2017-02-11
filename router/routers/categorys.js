const {Router} =require('express');
const CategoryController = require('../../controller/CategoryController');


const router = Router();
const categortCtrl = new CategoryController();

router.delete('/:id', categortCtrl.delete);
router.put('/:id', categortCtrl.update);
router.get('/', categortCtrl.getAll);
router.get('/:id', categortCtrl.getOne);
router.post('/', categortCtrl.create);

module.exports = router;