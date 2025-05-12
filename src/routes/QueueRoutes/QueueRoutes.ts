import { Router, Request, Response } from "express";
import { authenticateJWT } from "../../middleware/auth";
import { MessagesController } from "../../controllers/MessagesController/MessagesController";

export const router = Router();
const messagesController = new MessagesController();

router.get("/queue/status", authenticateJWT, (req: Request, res: Response) => {
  messagesController.getQueueStatus(req, res);
});

export default router;