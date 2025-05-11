import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authAdmin";
import { ConversationsService } from "../../services/ConversationsService/ConversationsService";

const conversationsService = new ConversationsService();

export class ConversationsController {
    async createConversation(req: AuthenticatedRequest, res: Response) {
        const clientData = req.body;
        const response = await conversationsService.createConversation(clientData);
        return res.status(201).json(response);
    }

    async getOneConversation(req: AuthenticatedRequest, res: Response) {
        const clientData = req.body;
        const response = await conversationsService.getOneConversation(clientData);
        return res.status(201).json(response);
    }

    async getAllMessagesByConversation(req: AuthenticatedRequest, res: Response) {
        const clientData = req.body;
        const response = await conversationsService.getAllMessagesByConversation(clientData);
        return res.status(201).json(response);
    }
}