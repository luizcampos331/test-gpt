import { Router } from "express";
import TextController from "../controllers/TextController";

const textRouter = Router();
const textController = new TextController();

// === POST ===
// LOCATION
textRouter.post('/', textController.generate);

export default textRouter;