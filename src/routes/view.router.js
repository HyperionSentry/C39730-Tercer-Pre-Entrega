
import { Router } from 'express';
import { authSession } from '../middleware/authSession.js';
import { renderProducts, renderUsers, renderCart, renderRegister, renderLogin, renderLogout, renderResetPassword } from '../controller/view.controller.js';

const router  = Router();



router.get('/products' , renderProducts);

router.get('/carts/:cid' , renderCart);

/* router.get('/messages' , renderMessages); */

router.get('/register' , renderRegister);

router.get('/login' , renderLogin);

router.get("/logout", renderLogout);


router.get('/resetPassword', renderResetPassword);

export default router;