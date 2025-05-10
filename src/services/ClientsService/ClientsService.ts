import { Client, ClientCreationAttributes } from '../../models/ClientModel';

export class ClientsService {
    async createClient(clientData: ClientCreationAttributes) {
        const response = await Client.create(clientData);
        return response;
    }

    async getClientById(clientId: number) {
        const response = await Client.findByPk(clientId);
        return response;
    }

    async getAllClients() {
        const response = await Client.findAll();
        return response;
    }

    async updateClient(clientId: number, clientData: Partial<ClientCreationAttributes>) {
        const response = await Client.update(clientData, {
            where: { id: clientId },
        });
        return response;
    }

    async balanceClient(clientId: number) {
        const response = await Client.findOne({
            where: { id: clientId },
        });
        return {
            balance: response?.dataValues.balance,
            limit: response?.dataValues.limit,
        };
    }
}