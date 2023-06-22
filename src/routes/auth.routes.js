import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller";

const router = Router();
//Registrarse
router.post("/signup", authCtrl.signUp);
//Iniciar sesión
router.post("/signin", authCtrl.signIn);

export default router;
