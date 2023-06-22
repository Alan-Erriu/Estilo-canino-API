import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller";

const router = Router();

router.post("/singup", authCtrl.signUp);
router.post("/singin", authCtrl.signIn);

export default router;
