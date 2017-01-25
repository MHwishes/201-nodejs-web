import {Router} from 'express';
import ItemController from '../../controller/ItemController';


const router = Router();
const itemCtrl = new ItemController();

router.delete('/:id', itemCtrl.deleteOneItem);
router.put('/:id', itemCtrl.updateOneItem);
router.get('/', itemCtrl.getAll);
router.get('/:id', itemCtrl.getOneItem);
router.post('/', itemCtrl.addNewItem);

export default router;