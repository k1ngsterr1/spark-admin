import { AddComponent } from "@core/use_cases/Component/AddComponent";
import { DeleteComponent } from "@core/use_cases/Component/DeleteComponent";
import { NewComponentRequest } from "@core/utils/Component/Request";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express"

class ComponentController{
  private addComponentToPage: AddComponent;
  private deleteComponentById: DeleteComponent;
  constructor(){
    this.addComponentToPage = new AddComponent();
    this.deleteComponentById = new DeleteComponent();
  }
  async addComponent(req: Request, res: Response){
    let errors: ErrorDetails[] = [];
    try{
      const request: NewComponentRequest = {
        userId: req.user.id,
        url: req.body.url,
        name: req.body.name,
        text: req.body.text,
        blockId: req.body.blockId
      }

      await this.addComponentToPage.execute(request, errors);

      if(errors.length > 0){
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res.status(201).json({ message: "Компонента была добалена." });
    }
    catch(error){
      console.log(error);
      res.status(500).json({ message: "Произошла ошибка при добавление компоненты." });
    }
  }

  async deleteComponent(req: Request, res: Response): Promise<void>{
    const errors: ErrorDetails[] = [];
    try{
      const id: number = req.body.id;
      const userId: number = req.user.id;

      await this.deleteComponentById.execute(id, userId, errors);

      if(errors.length > 0){
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res.status(200).json({ message: "Успешно удалили компоненту" });
    }catch(error){
      console.log(error);
      res.status(500).json({ message: "Произошла ошибка при удалении компоненты." });
    }
  }
}

export default new ComponentController();
