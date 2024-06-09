import { IComponentRepository } from "@core/interfaces/IComponentRepository";
import { NewComponentInput } from "@core/utils/types";
import { Component } from "@infrastructure/models/componentModel";
import sequelize from "infrastructure/config/sequelize";

export class ComponentRepository implements IComponentRepository {
    
    // Добавление компоненты: кнопка, параграф и т.д
    async create(componentDetails: NewComponentInput): Promise<Component>{
        return sequelize.getRepository(Component).create(componentDetails);
    }

    // Удаление компоненты
    async deleteById(id: number): Promise<void>{
        await sequelize.getRepository(Component).destroy({
            where: {
                id: id,
            }
        })
        .catch(error => console.log(error));
    }

    // Поиск компоненты по id
    async findById(id: number): Promise<Component> {
        const component = await sequelize.getRepository(Component).findByPk(id);
        return component;
    }
}
