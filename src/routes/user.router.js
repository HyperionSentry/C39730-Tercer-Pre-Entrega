import { Router } from "express";
import controller from "../controller/user.js";

const router = Router();

router.get("/", controller.getAll);

router.post("/", controller.saveUser);

router.post("/:uid/carts/:cid", controller.addUserToCart);

export default router;