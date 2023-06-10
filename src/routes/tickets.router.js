import { Router } from "express";
import {getTickets,getTicketById, createTicket, resolveTicket} from '../controller/tickets.controller.js'
const router = Router();

router.get('/',getTickets);
router.post('/:cid/purchase',createTicket)

router.get('/:oid',getTicketById)
router.put('/:oid',resolveTicket)

export default router;