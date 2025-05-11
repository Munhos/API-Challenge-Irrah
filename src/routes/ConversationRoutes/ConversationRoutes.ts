
import { Router, Request, Response } from "express";
import { authenticateJWT } from "../../middleware/auth";
import { ConversationsController } from "../../controllers/ConversationsController/ConversationsController";

export const router = Router();
const conversationController = new ConversationsController();

router.post("/conversations", authenticateJWT, (req: Request, res: Response) => {
  conversationController.createConversation(req, res);
});

router.get("/conversations/:id", authenticateJWT, (req: Request, res: Response) => {
  conversationController.getOneConversation(req, res);
});

router.get("/conversations/:id/messages", authenticateJWT, (req: Request, res: Response) => {
  conversationController.getAllMessagesByConversation(req, res);
});

export default router;