import { Router } from "express";
import * as dogCtrl from "../controllers/dog.controller";
import { verifyToken } from "../middlewares/authjwt";

const router = Router();
//crea un nuevo perro
router.post("/", verifyToken, dogCtrl.createDog);
// obtener perro por id
router.get("/:dogId", verifyToken, dogCtrl.getDogById);
//obtener todos los perro relacionados al id de dueño
router.get("/", verifyToken, dogCtrl.getDogsByOwnerId);
// actualizar perro por id
router.put("/:dogId", verifyToken, dogCtrl.UpdateDogById);
//borrar perro por id
router.delete("/:dogId", verifyToken, dogCtrl.deleteDogById);

export default router;
