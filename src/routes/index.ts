import { Router } from "express";
import clientsRoutes from "./ClientsRoutes/ClientsRoutes";
import authRouter from "./AuthRoutes/AuthRoutes";
import conversationRoutes from "./ConversationRoutes/ConversationRoutes";
import messagesRoutes from "./MessagesRoutes/MessagesRoutes";

const router = Router();

router.use(clientsRoutes);
router.use(authRouter);
router.use(conversationRoutes);
router.use(messagesRoutes);

export default router;
