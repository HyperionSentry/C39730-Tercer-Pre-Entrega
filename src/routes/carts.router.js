import { Router } from 'express';
import { getCart, saveCart, updateCart, deleteProducts } from '../controller/carts.controller.js';
import {getTickets,getTicketById, createTicket, resolveTicket} from '../controller/tickets.controller.js'
const router  = Router();


////////////////////////
/// Rutas para carts ///
////////////////////////

router.get('/:cid', getCart);

router.post('/', saveCart);

router.post('/:cid/products/:pid', saveCart);

router.put('/:cid', updateCart);

router.put('/:cid/products/:pid', updateCart);

router.delete('/:cid', deleteProducts);

router.delete('/:cid/products/:pid', deleteProducts);

//
// Ticket
router.post('/:cid/purchase',createTicket)

export default router;



