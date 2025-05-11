import { Router, Request, Response } from "express";
import { authenticateJWT } from "../../middleware/auth";
import { MessagesController } from "../../controllers/MessagesController/MessagesController";

export const router = Router();
const messagesController = new MessagesController();

router.post("/messages", authenticateJWT, (req: Request, res: Response) => {
  messagesController.sendMessage(req, res);
});

router.get("/messages", authenticateJWT, (req: Request, res: Response) => {
  messagesController.listMessageFilters(req, res);
});

router.get("/messages/:id", authenticateJWT, (req: Request, res: Response) => {
  messagesController.messageDetails(req, res);
});

router.get("/messages/:id/status", authenticateJWT, (req: Request, res: Response) => {
  messagesController.messageStatus(req, res);
});

export default router;