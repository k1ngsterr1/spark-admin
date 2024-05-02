import { NewComponentInput } from "@core/utils/types";
import { Component } from "@infrastructure/models/componentModel";

export interface IComponentRepository {
    create(request: NewComponentInput): Promise<Component>;
}