import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authAdmin";
import { MessagesService } from "../../services/MessagesService/MessagesService";

const messagesService = new MessagesService();

export class MessagesController {
  async sendMessage(req: AuthenticatedRequest, res: Response) {
    try {
      const clientData = req.body;
      const response = await messagesService.sendMessage(clientData);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      return res.status(500).json({ error: "Erro ao enviar mensagem." });
    }
  }

  async listMessageFilters(req: AuthenticatedRequest, res: Response) {
    try {
      const senderId = req.client?.data.id;

      if (!senderId) {
        return res.status(400).json({ message: "Sender ID é obrigatório." });
      }

      const response = await messagesService.listMessageFilters(senderId);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Erro ao listar filtros de mensagens:", error);
      return res.status(500).json({ error: "Erro ao listar filtros de mensagens." });
    }
  }

  async messageDetails(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const response = await messagesService.messageDetails(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error(`Erro ao buscar detalhes da mensagem com ID ${req.params.id}:`, error);
      return res.status(500).json({ error: "Erro ao buscar detalhes da mensagem." });
    }
  }

  async messageStatus(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const response = await messagesService.messageStatus(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error(`Erro ao buscar status da mensagem com ID ${req.params.id}:`, error);
      return res.status(500).json({ error: "Erro ao buscar status da mensagem." });
    }
  }
}
