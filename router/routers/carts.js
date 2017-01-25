import {Router} from 'express';
import CartController from '../../controller/CartControllers';


const router = Router();
const cartCtrl = new CartController();

router.delete('/:id', cartCtrl.deleteOneCart);
router.put('/:id', cartCtrl.updateOneCart);
router.get('/', cartCtrl.getAllCarts);
router.get('/:id', cartCtrl.getOneCart);
router.post('/', cartCtrl.addNewCart);

export default router;