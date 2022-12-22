import express from "express"
import { startGame, getGame, updateMove, getAllGame, getUser } from "../Controller/GameController.js";

const router = express.Router();

router.post("/start/:userId", startGame);
router.post("/get/:gameId", getGame);
router.patch("/update/:gameId", updateMove);
router.post("/timeline/:userId", getAllGame);
router.post("/user/:userId", getUser);

export default router