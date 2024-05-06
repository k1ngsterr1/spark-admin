import { AddComponent } from "@core/use_cases/Component/AddComponent";
import { DeleteComponent } from "@core/use_cases/Component/DeleteComponent";
import { SaveComponent } from "@core/use_cases/Component/SaveComponent";
import { NewComponentRequest, SaveComponentRequest } from "@core/utils/Component/Request";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express";

class ComponentController {
  private addComponentToPage: AddComponent;
  private deleteComponentById: DeleteComponent;
  private saveComponentById: SaveComponent;
  constructor() {
    this.addComponentToPage = new AddComponent();
    this.deleteComponentById = new DeleteComponent();
    this.saveComponentById = new SaveComponent();
  }

  // Добавление компонентов
  async addComponent(req: Request, res: Response) {
    let errors: ErrorDetails[] = [];
    try {
      const request: NewComponentRequest = {
        userId: req.user.id,
        elementType: req.body.elementType,
        content: req.body.content,
        attributes: req.body.attributes,
        url: req.body.url,
        name: req.body.name,
        text: req.body.text,
        blockId: req.body.blockId,
      };

      await this.addComponentToPage.execute(request, errors);

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res.status(201).json({ message: "Компонента была добалена." });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Произошла ошибка при добавление компоненты." });
    }
  }

  // Удаление компонентов
  async deleteComponent(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const id: number = req.body.id;
      const userId: number = req.user.id;

      await this.deleteComponentById.execute(id, userId, errors);

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res.status(200).json({ message: "Успешно удалили компоненту" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Произошла ошибка при удалении компоненты." });
    }
  }

  async saveComponent(req: Request, res: Response): Promise<void>{
    const errors: ErrorDetails[] = [];
    try{
      const request: SaveComponentRequest = {
        userId: req.user.id,
        componentId: req.body.componentId,
        elementType: req.body.elementType,
        content: req.body.content,
        attributes: req.body.attributes,
        url: req.body.url,
        name: req.body.name,
        text: req.body.text,
        blockId: req.body.blockId,
      };
      
      await this.saveComponentById.execute(request, errors);

      if(errors.length > 0){
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res.status(200).json({ message: "Успешно сохранили компонент." })
    }catch(error){
      console.log(error);
      res.status(500).json({ message: "Произошла ошибка при сохранение компоненты." });
    }
  }
}

export default new ComponentController();
