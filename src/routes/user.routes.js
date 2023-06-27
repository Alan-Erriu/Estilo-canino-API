import * as userCtrl from "../controllers/user.controller";
import { Router } from "express";
import { verifyToken, isAdministrador } from "../middlewares/authjwt";
import {
  checkExistingRole,
  checkExistingUser,
} from "../middlewares/verifysignup";

const router = Router();
//crear un usuario, solo van a poder los admin
router.post(
  "/",
  [verifyToken, isAdministrador, checkExistingRole],
  userCtrl.createUser
);
//obtener todos los usuarios
router.get("/all", verifyToken, userCtrl.getAllUsers);

//obtener un usuario por id
router.get("/", verifyToken, userCtrl.getUserById);
//Usuario actuliza sus datos
router.put("/", verifyToken, userCtrl.updateUserById);

//borrar cualquier usuario, solo van a poder los admin
router.delete(
  "/:userId",
  [verifyToken, isAdministrador],
  userCtrl.deleteUserById
);

export default router;
