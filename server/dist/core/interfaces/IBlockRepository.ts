import { NewComponentInput } from "@core/utils/types";
import { Block } from "@infrastructure/models/blockModel";

export interface IComponentRepository {
    create(request: NewComponentInput): Promise<Block>
}