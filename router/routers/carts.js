const {Router} =require('express');
const CartController = require('../../controller/cart-controller');


const router = Router();
const cartCtrl = new CartController();

router.delete('/:id', cartCtrl.delete);
router.put('/:id', cartCtrl.update);
router.get('/', cartCtrl.getAll);
router.get('/:id', cartCtrl.getOne);
router.post('/', cartCtrl.create);

module.exports = router;