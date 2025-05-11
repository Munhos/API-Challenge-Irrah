import { Router, Request, Response } from "express";
import { ClientsController } from "../../controllers/ClientsController/ClientsController";

export const router = Router();
const clientController = new ClientsController();

router.post("/clients", (req: Request, res: Response) => {
  clientController.createClient(req, res);
});

router.get("/clients", (req: Request, res: Response) => {
  clientController.getAllClients(req, res);
});

router.get("/clients/:id", (req: Request, res: Response) => {
  clientController.getClientById(req, res);
});

router.put("/clients/:id", (req: Request, res: Response) => {
  clientController.updateClient(req, res);
});

router.get("/clients/:id/balance", (req: Request, res: Response) => {
  clientController.getClientBalance(req, res);
});

export default router;