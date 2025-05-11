
import { Router, Request, Response } from "express";
import { ClientsController } from "../../controllers/ClientsController/ClientsController";
import { authenticateJWTAdmin } from "../../middleware/authAdmin";
import { authenticateJWT } from "../../middleware/auth";

export const router = Router();
const clientController = new ClientsController();

router.post("/clients", authenticateJWT, (req: Request, res: Response) => {
  clientController.createClient(req, res);
});

router.get("/clients", authenticateJWTAdmin, (req: Request, res: Response) => {
  clientController.getAllClients(req, res);
});

router.get("/clients/:id", authenticateJWTAdmin, (req: Request, res: Response) => {
  clientController.getClientById(req, res);
});

router.put("/clients/:id", authenticateJWTAdmin, (req: Request, res: Response) => {
  clientController.updateClient(req, res);
});

router.get("/clients/:id/balance", authenticateJWTAdmin, (req: Request, res: Response) => {
  clientController.getClientBalance(req, res);
});

export default router;