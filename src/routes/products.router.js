import { Router } from 'express';
import { getProductById, getAll, postProduct, putProduct, deleteProduct } from '../controller/products.controller.js';
const router  = Router();

////////////////////////////
/// Rutas para productos ///
////////////////////////////

router.get('/', getAll);

router.get('/:pid', getProductById);

router.post('/', postProduct);

router.put('/:pid', putProduct);

router.delete('/:pid', deleteProduct);

export default router;