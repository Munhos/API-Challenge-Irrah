import { Router } from "express";
import clientsRoutes from "./ClientsRoutes/ClientsRoutes";

const router = Router();

router.use(clientsRoutes);

export default router;
