import { Compani, CompaniCreationAttributes } from '../../models/CompaniModel';

export class CompaniService {
    async createCompani(CompaniData: CompaniCreationAttributes) {
        const response = await Compani.create(CompaniData);
        return response;
    }

    async getAllCompanis() {
        const response = await Compani.findAll();
        return response;
    }

    async getCompaniById(companiId: number) {
        const response = await Compani.findByPk(companiId);
        return response;
    }

    async updateCompani(companiId: number, companiData: Partial<CompaniCreationAttributes>) {
        const response = await Compani.update(companiData, {
            where: { id: companiId },
        });
        return response;
    }

    async deleteCompani(companiId: number) {
        const response = await Compani.destroy({
            where: { id: companiId },
        });
        return response;
    }
}