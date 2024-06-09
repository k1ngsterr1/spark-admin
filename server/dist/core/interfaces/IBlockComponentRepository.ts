import { NewBlockComponentInput } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { BlockComponent } from "@infrastructure/models/blockComponentModel";

export interface IBlockComponentRepository {
    create(request: NewBlockComponentInput, errors: ErrorDetails[]): Promise<BlockComponent>;
    findByPk(pk: number, errors: ErrorDetails[]): Promise<BlockComponent>
}