import { Router } from "express";
import * as turnsCtrl from "../controllers/turn.controller";
import { verifyToken, isAdministrador } from "../middlewares/authjwt";
const router = Router();

//obtener un turno por id de turno-------------------------------------------------
router.post("/", verifyToken, turnsCtrl.getAvailableTurnsByDate);
//el cliente solicita un nuevo turno---------------------------------------
router.post("/create", verifyToken, turnsCtrl.createTurnByClient);
//obtener todos los turnos por fecha de menor a mayor (fecha)
router.get("/turns", verifyToken, turnsCtrl.getAllTurns);
//traer todos los turnos por fecha y peluquero especifico
router.post("/alls", verifyToken, turnsCtrl.getAppointmentsByGroomerAndDate);
//traer todos los turnos por id de cliente especifico
router.post("/allclient", verifyToken, turnsCtrl.getAppointmentsByClientId);
//traer todos los turnos por perro id especifico
router.post("/alldog", verifyToken, turnsCtrl.getAppointmentsByDogId);
//borar un turno por id
router.delete("/:_id", verifyToken, turnsCtrl.deleteTurnById);

export default router;
