import { IPageCardRepository } from "@core/interfaces/IPageCardRepository";
import { NewPageCardInput } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { BlockComponent } from "@infrastructure/models/blockComponentModel";
import { Block } from "@infrastructure/models/blockModel";
import CardToBlock from "@infrastructure/models/cardToblockModel";
import { PageCard } from "@infrastructure/models/pageCardModel";
import sequelize from "infrastructure/config/sequelize";

export class PageCardRepository implements IPageCardRepository {
  async create(pageCardDetails: NewPageCardInput, errors: ErrorDetails[]): Promise<PageCard> {
    try{
      return await sequelize.getRepository(PageCard).create(pageCardDetails);
    }
    catch(error){
      errors.push(new ErrorDetails(500, error.message));
      return null;
    }
  }
  async findByName(name: string, errors: ErrorDetails[]): Promise<PageCard> {
    try{
      return await sequelize.getRepository(PageCard).findOne(
        {
          where: {
            name: name
          },
          include: [
            {
              model: sequelize.getRepository(Block),
              attributes: [
                "id",
                "name",
                "title",
                "description",
                "type",
                "css_link",
                "image_url",
                "video_url",
              ],
              include: [
                {
                  model: sequelize.getRepository(BlockComponent),
                  attributes: [
                    "id",
                    "name",
                    "text"
                  ]
                }
              ]
            }
          ]
        }
      );
    }catch(error){
      errors.push(new ErrorDetails(500, error.message));
      return null;
    }
  }
  async addBlock(blockId: number, pageCardId: number, errors: ErrorDetails[]): Promise<CardToBlock> {
    try{
      return await sequelize.getRepository(CardToBlock).create(
        {
          blockId: blockId,
          pageCardId: pageCardId
        }
      );
    }catch(error){
      errors.push(new ErrorDetails(500, error.message));
      return null;
    } 
  }
}
