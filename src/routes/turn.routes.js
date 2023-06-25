import { Router } from "express";
import * as turnsCtrl from "../controllers/turn.controller";
import { verifyToken, isAdministrador } from "../middlewares/authjwt";
const router = Router();
//obtener todos los turnos, ordenados por peluquero(solo el admin puede)
router.get(
  "/",
  [verifyToken, isAdministrador],
  turnsCtrl.getAllTurnsByPeluquero
);
//obtener un turno por id de turno-------------------------------------------------
router.get("/:turnId", verifyToken, turnsCtrl.getTurnById);
//el cliente solicita un nuevo turno---------------------------------------
router.post("/", verifyToken, turnsCtrl.createTurnByClient);

router.put("/:turnId", turnsCtrl.UpdateTurnById);
router.delete("/:turnId", verifyToken, turnsCtrl.deleteTurnById);

export default router;
