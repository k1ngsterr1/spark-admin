import { NewBlockInput } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { Block } from "@infrastructure/models/blockModel";

export interface IBlockRepository {
    create(request: NewBlockInput, errors: ErrorDetails[]): Promise<Block>;
    findByName(name: string): Promise<Block>;
}