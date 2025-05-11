import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authAdmin";
import { MessagesService } from "../../services/MessagesService/MessagesService";

const messagesService = new MessagesService();

export class MessagesController {
    async sendMessage(req: AuthenticatedRequest, res: Response) {
        const clientData = req.body;
        const response = await messagesService.sendMessage(clientData);
        return res.status(201).json(response);
    }

    async listMessageFilters(req: AuthenticatedRequest, res: Response) {
        const senderId = req.client?.data.id;
    
        if (!senderId) {
            return res.status(400).json({ message: 'Sender ID is required' });
        }
    
        const response = await messagesService.listMessageFilters(senderId);
        return res.status(200).json(response);
    }
    

    async messageDetails(req: AuthenticatedRequest, res: Response) {
        const { id } = req.params;
        const response = await messagesService.messageDetails(id);
        return res.status(201).json(response);
    }

    async messageStatus(req: AuthenticatedRequest, res: Response) {
        const { id } = req.params;
        const response = await messagesService.messageStatus(id);
        return res.status(201).json(response);
    }

}