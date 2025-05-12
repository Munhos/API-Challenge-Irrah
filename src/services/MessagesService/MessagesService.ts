import { Conversation } from "../../models/ConversationModel";
import { Message, MessageCreationAttributes } from "../../models/MessageModel";
import { ClientsService } from "../ClientsService/ClientsService";

const clientService = new ClientsService();

class ClientNotFoundError extends Error { }
class InsufficientBalanceError extends Error { }
class InsufficientLimitError extends Error { }

export class MessagesService {
    async sendMessage(messageData: MessageCreationAttributes) {
        const clientId = messageData.senderId;

        try {
            const client = await clientService.getClientById(clientId.toString());
            if (!client) {
                throw new ClientNotFoundError("Cliente não encontrado.");
            }

            const planType = client.dataValues.planType;
            const balance = client.dataValues.balance;
            const limit = client.dataValues.limit;

            if (planType === "prepaid") {
                if (balance < messageData.cost) {
                    throw new InsufficientBalanceError("Saldo insuficiente.");
                }

                await clientService.updateClient(clientId.toString(), {
                    balance: balance - messageData.cost,
                });
            }

            if (planType === "postpaid") {
                if (limit < messageData.cost) {
                    throw new InsufficientLimitError("Limite insuficiente.");
                }

                await clientService.updateClient(clientId.toString(), {
                    limit: limit - messageData.cost,
                });
            }

            if (!messageData.conversationId) {
                // Cria nova conversa com ID gerado automaticamente
                const conversation = await Conversation.create({
                    id: Date.now().toString(),
                    clientId: messageData.senderId,
                    recipientId: messageData.recipientId,
                    recipientName: "",
                    lastMessageContent: messageData.content,
                    unreadCount: 0,
                    lastMessageTime: new Date(),
                });

                // @ts-ignore
                messageData.conversationId = conversation.id;
            } else {
                // Verifica se a conversa existe
                const existingConversation = await Conversation.findOne({
                    where: { id: messageData.conversationId },
                });

                if (!existingConversation) {
                    // Cria conversa com o ID informado
                    await Conversation.create({
                        id: messageData.conversationId,
                        clientId: messageData.senderId,
                        recipientId: messageData.recipientId,
                        recipientName: "",
                        lastMessageContent: messageData.content,
                        unreadCount: 0,
                        lastMessageTime: new Date(),
                    });
                }
            }

            // Cria a mensagem
            const newMessage = await Message.create(messageData);

            // Processa mensagens da fila
            const messageQueue = await Message.findAll({
                where: { conversationId: messageData.conversationId }
            });

            messageQueue.push(newMessage);

            for (let msg of messageQueue) {
                // @ts-ignore
                if (msg.status === 'queued') {
                    await Message.update(
                        { status: 'processing' },
                        // @ts-ignore
                        { where: { id: msg.id } }
                    );

                    await Message.update(
                        { status: 'sent' },
                        // @ts-ignore
                        { where: { id: msg.id } }
                    );
                }
            }

            // Atualiza informações da conversa
            await Conversation.update(
                {
                    lastMessageContent: messageData.content,
                    lastMessageTime: new Date(),
                },
                {
                    where: { id: messageData.conversationId }
                }
            );

            return newMessage;
        } catch (error) {
            if (
                error instanceof ClientNotFoundError ||
                error instanceof InsufficientBalanceError ||
                error instanceof InsufficientLimitError
            ) {
                throw error;
            }
            throw new Error("Erro ao enviar mensagem.");
        }
    }

    async listMessageFilters(senderId?: string, conversationId?: string) {
        const params: any = {};

        if (senderId) {
            params.senderId = senderId;
        }

        if (conversationId) {
            params.conversationId = conversationId;
        }

        const messages = await Message.findAll({
            where: params,
            order: [
                ['priority', 'DESC'],
                ['timestamp', 'ASC'],
            ]
        });

        // Atualiza status para 'read' se ainda estiverem como 'sent'
        const idsToUpdate = messages
            // @ts-ignore
            .filter(msg => msg.status === 'sent')
            // @ts-ignore
            .map(msg => msg.id);

        if (idsToUpdate.length > 0) {
            await Message.update(
                { status: 'read' },
                { where: { id: idsToUpdate } }
            );
        }

        return messages;
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

    async getQueueStatus() {
        try {
            const totalMessages = await Message.count();
            const queuedMessages = await Message.count({ where: { status: 'queued' } });
            const processingMessages = await Message.count({ where: { status: 'processing' } });
            const sentMessages = await Message.count({ where: { status: 'sent' } });

            return {
                totalMessages,
                queuedMessages,
                processingMessages,
                sentMessages,
            };
        } catch (error) {
            throw new Error("Erro ao obter estatísticas da fila.");
        }
    }
}
