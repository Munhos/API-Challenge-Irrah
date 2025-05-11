import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authAdmin";
import { ConversationsService } from "../../services/ConversationsService/ConversationsService";

const conversationsService = new ConversationsService();

export class ConversationsController {
  async createConversation(req: AuthenticatedRequest, res: Response) {
    try {
      const clientData = req.body;
      const response = await conversationsService.createConversation(clientData);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Erro ao criar conversa:", error);
      return res.status(500).json({ error: "Erro ao criar conversa." });
    }
  }

  async getOneConversation(req: AuthenticatedRequest, res: Response) {
    try {
      const clientData = req.body;
      const response = await conversationsService.getOneConversation(clientData);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Erro ao buscar conversa:", error);
      return res.status(500).json({ error: "Erro ao buscar conversa." });
    }
  }

  async getAllMessagesByConversation(req: AuthenticatedRequest, res: Response) {
    try {
      const clientData = req.body;
      const response = await conversationsService.getAllMessagesByConversation(clientData);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Erro ao buscar mensagens da conversa:", error);
      return res.status(500).json({ error: "Erro ao buscar mensagens da conversa." });
    }
  }
}
