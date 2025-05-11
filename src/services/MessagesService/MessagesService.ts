import { Conversation } from "../../models/ConversationModel";
import { Message, MessageCreationAttributes } from "../../models/MessageModel";

export class MessagesService {
    async sendMessage(messageData: MessageCreationAttributes) {
        if (!messageData.conversationId) {
            const conversation = await Conversation.create({
                id: Date.now().toString(),
                clientId: messageData.senderId,
                recipientId: messageData.recipientId,
                recipientName: "",
                lastMessageContent: messageData.content,
                unreadCount: 0,
                lastMessageTime: new Date()

            });
    
            
            const newMessage = await Message.create({
                ...messageData,
                // @ts-ignore
                conversationId: conversation.id
            });
    
            return newMessage;
        }
    
        const message = await Message.create(messageData);
        return message;
    }
    

    async listMessageFilters(senderId: string | undefined) {
        const params = senderId ? { senderId } : {};

        const response = await Message.findAll({ where: params });
        return response;
    }

    async messageDetails(id: string | undefined) {
        const params = id ? { id } : {};

        const response = await Message.findOne({ where: params });
        return response;
    }

    async messageStatus(id: string | undefined) {
        const params = id ? { id } : {};

        const response = await Message.findOne({ where: params });
        return response?.dataValues.status;
    }
}