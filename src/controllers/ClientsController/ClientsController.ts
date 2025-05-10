import { Request, Response } from "express";
import { ClientsService } from "../../services/ClientsService/ClientsService";

const clientService = new ClientsService();

export class ClientsController {
  async createClient(req: Request, res: Response) {
    const clientData = req.body;
    const response = await clientService.createClient(clientData);
    return res.status(201).json(response);
  }

  async getAllClients(req: Request, res: Response) {
    const response = await clientService.getAllClients();
    return res.status(200).json(response);
  }

  async getClientById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await clientService.getClientById(Number(id));
    return res.status(200).json(response);
  }

  async updateClient(req: Request, res: Response) {
    const { id } = req.params;
    const clientData = req.body;
    const response = await clientService.updateClient(Number(id), clientData);
    return res.status(200).json(response);
  }

  //FAZER VERIFICAÇÂO PARA RETORNAR SALDO OU DIVIDA
  async getClientBalance(req: Request, res: Response) {
    const { id } = req.params;
    await clientService.balanceClient(Number(id));
    return res.status(204).send();
  }
}
