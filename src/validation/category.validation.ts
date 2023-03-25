import Joi from "joi";
import { CustomError } from "../helpers/CustomError";

export class CategoryValidations {
  static async CreateCategoryValidation(data: any) {
    return await Joi.object({
      category_name: Joi.string().required().error(new CustomError("Category name is invalid", 400)),
      category_name_translations: Joi.string()
        .required()
        .error(new CustomError("Category name translations is invalid", 400)),
    }).validateAsync(data);
  }
}
