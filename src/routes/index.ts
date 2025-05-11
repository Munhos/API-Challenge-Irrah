import { Router } from "express";
import clientsRoutes from "./ClientsRoutes/ClientsRoutes";
import authRouter from "./AuthRoutes/AuthRoutes"
import conversationRoutes from "./ConversationRoutes/ConversationRoutes"

const router = Router();

router.use(clientsRoutes);
router.use(authRouter);
router.use(conversationRoutes);

export default router;
