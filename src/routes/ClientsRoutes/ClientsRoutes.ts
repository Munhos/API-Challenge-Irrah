import express, { Request, Response } from "express";
import { ClientsController } from "../../controllers/ClientsController/ClientsController";
import { router } from "../..";

const clientController = new ClientsController();

router.post("/api/cliets", (req: Request, res: Response) => {
  clientController.createClient(req, res);
});

router.get("/api/cliets", (req: Request, res: Response) => {
  clientController.getAllClients(req, res);
});

router.get("/api/cliets/:id", (req: Request, res: Response) => {
  clientController.getClientById(req, res);
});

router.put("/api/cliets/:id", (req: Request, res: Response) => {
  clientController.updateClient(req, res);
});

router.get("/api/clients/:id/balance", (req: Request, res: Response) => {
  clientController.getClientBalance(req, res);
});