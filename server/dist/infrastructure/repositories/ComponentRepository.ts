import { IComponentRepository } from "@core/interfaces/IComponentRepository";
import { NewComponentInput } from "@core/utils/types";
import { Component } from "@infrastructure/models/componentModel";
import sequelize from "infrastructure/config/sequelize";

export class ComponentRepository implements IComponentRepository {
    async create(componentDetails: NewComponentInput): Promise<Component>{
        return sequelize.getRepository(Component).create(componentDetails);
    }
}
