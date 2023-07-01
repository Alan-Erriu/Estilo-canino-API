import { Router } from "express";
import * as dogCtrl from "../controllers/dog.controller";
import { isAdministrador, verifyToken } from "../middlewares/authjwt";

const router = Router();
//crea un nuevo perro
router.post("/", verifyToken, dogCtrl.createDog);
// obtener perro por id
router.get("/:dogId", verifyToken, dogCtrl.getDogById);
//obtener todos los perro relacionados al id de dueño por id guardado en token
router.get("/", verifyToken, dogCtrl.getDogsByOwnerId);
//obtener todos los perro relacionados al id de dueño por body
router.post("/alldog", verifyToken, dogCtrl.getDogsByOwnerIdBody);
// actualizar perro por id
router.put("/:dogId", verifyToken, dogCtrl.UpdateDogById);
//borrar perro por id
router.delete("/:dogId", verifyToken, dogCtrl.deleteDogById);

export default router;
