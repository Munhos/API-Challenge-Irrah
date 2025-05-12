import { Response } from "express";
import { ClientsService } from "../../services/ClientsService/ClientsService";
import { AuthenticatedRequest } from "../../middleware/auth";

const clientService = new ClientsService();

export class ClientsController {
  async createClient(req: AuthenticatedRequest, res: Response) {
    try {
      const clientData = req.body;
      const response = await clientService.createClient(clientData);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      return res.status(500).json({ error: "Erro ao criar cliente." });
    }
  }

  async getAllClients(req: AuthenticatedRequest, res: Response) {
    try {
      const response = await clientService.getAllClients();
      const cliente = req.client;
      return res.json({ cliente, response });
    } catch (error) {
      console.error("Erro ao buscar todos os clientes:", error);
      return res.status(500).json({ error: "Erro ao buscar clientes." });
    }
  }

  async getClientById(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const response = await clientService.getClientById(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error(`Erro ao buscar cliente com ID ${req.params.id}:`, error);
      return res.status(500).json({ error: "Erro ao buscar cliente por ID." });
    }
  }

  async updateClient(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const clientData = req.body;
      const response = await clientService.updateClient(id, clientData);
      return res.status(200).json(response);
    } catch (error) {
      console.error(`Erro ao atualizar cliente com ID ${req.params.id}:`, error);
      return res.status(500).json({ error: "Erro ao atualizar cliente." });
    }
  }

  async getClientBalance(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const payload = req.client;

      if (!payload) {
        return res.status(401).json({ error: "Token inválido." });
      }

      const response = await clientService.balanceClient(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error(`Erro ao obter saldo do cliente com ID ${req.params.id}:`, error);
      return res.status(500).json({ error: "Erro ao obter saldo do cliente." });
    }
  }
}
