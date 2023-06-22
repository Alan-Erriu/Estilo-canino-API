import { Router } from "express";
import * as turnsCtrl from "../controllers/turns.controller";
const router = Router();

router.get("/", turnsCtrl.getTurns);
router.get("/:turnId", turnsCtrl.getTurnById);
router.post("/", turnsCtrl.createTurn);
router.put("/:turnId", turnsCtrl.UpdateTurnById);
router.delete("/:turnId", turnsCtrl.deleteTurnById);

export default router;
