// src/controllers/ClientsController/ClientsController.ts
import { Response } from "express";
import { ClientsService } from "../../services/ClientsService/ClientsService";
import { AuthenticatedRequest } from "../../middleware/auth";

const clientService = new ClientsService();

export class ClientsController {
  async createClient(req: AuthenticatedRequest, res: Response) {
    const clientData = req.body;
    const response = await clientService.createClient(clientData);
    return res.status(201).json(response);
  }

  async getAllClients(req: AuthenticatedRequest, res: Response) {
    const response = await clientService.getAllClients();
    const cliente = req.client
    return res.json({cliente});
  }

  async getClientById(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const response = await clientService.getClientById(Number(id));
    return res.status(200).json(response);
  }

  async updateClient(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const clientData = req.body;
    const response = await clientService.updateClient(Number(id), clientData);
    return res.status(200).json(response);
  }

  async getClientBalance(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;

    // Exemplo de validação: o CPF/CNPJ do token bate com o ID?
    const payload = req.client;
    if (!payload) return res.status(401).json({ error: "Token inválido" });

    const response = await clientService.balanceClient(Number(id));
    return res.status(200).json(response); // Se retornar valor, altere para 200
  }
}
