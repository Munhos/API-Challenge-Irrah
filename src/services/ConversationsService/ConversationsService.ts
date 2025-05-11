import { Conversation, ConversationCreationAttributes } from "../../models/ConversationModel";
import { Message } from "../../models/MessageModel";

export class ConversationsService {
    async createConversation(conversationData: ConversationCreationAttributes) {
        const response = await Conversation.create(conversationData);
        return response;
    }

    async getOneConversation(conversationId: string) {
        const response = await Conversation.findByPk(conversationId);
        return response;
    }

    async updateConversation(conversationId: string, data: ConversationCreationAttributes) {
        const response = await Conversation.update(data, {where: { id: conversationId}})
        return response;
    }

    async getAllMessagesByConversation(conversationId: number) {
        const response = await Message.findAll({
            where: {
                conversationId
            }
        });
        return response;
    }
}