import {Router} from 'express';
import CategoryController from '../../controller/CategoryController';


const router = Router();
const categortCtrl = new CategoryController();

router.delete('/:id', categortCtrl.deleteOneCategory);
router.put('/:id', categortCtrl.updateOneCategory);
router.get('/', categortCtrl.getAllCategorys);
router.get('/:id', categortCtrl.getOneCategory);
router.post('/', categortCtrl.addNewCategory);

export default router;