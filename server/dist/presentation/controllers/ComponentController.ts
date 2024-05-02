
import { AddComponent } from "@core/use_cases/Component/AddComponent";
import { NewComponentRequest } from "@core/utils/Component/Request";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express"

class ComponentController{
  private addComponentToPage: AddComponent;
  constructor(){
    this.addComponentToPage = new AddComponent();
  }
  async addComponent(req: Request, res: Response){
    let errors: ErrorDetails[] = [];
    try{
      const request: NewComponentRequest = {
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

      res.status(201).json({ message: 'Компонента была добалена.' });
    }
    catch(error){
      res.status(500).json({ message: "Произошла ошибка при добавление компоненты." });
    }
  }
}
export default new ComponentController();