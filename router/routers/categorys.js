const {Router} =require('express');
const CategoryController = require('../../controller/CategoryController');


const router = Router();
const categortCtrl = new CategoryController();

router.delete('/:id', categortCtrl.deleteOneCategory);
router.put('/:id', categortCtrl.updateOneCategory);
router.get('/', categortCtrl.getAllCategorys);
router.get('/:id', categortCtrl.getOneCategory);
router.post('/', categortCtrl.addNewCategory);

module.exports = router;