import Joi from "joi";
import { CustomError } from "../helpers/CustomError";

export class Validations {
  static async RegisterPhoneNumberValidation(data: any) {
    return await Joi.object({
      phone_number: Joi.string()
        .required()
        .pattern(
          new RegExp(/^(\+998)?(\s)?\d{2}(\s)?\d{3}(\s)?\d{2}(\s)?\d{2}$/)
        )
        .error(
          new CustomError(
            "Phone number must be in the format +9989xxxxxxxxx",
            400
          )
        ),
    }).validateAsync(data);
  }
  static async HashValidation(data: any) {
    return await Joi.object({
      hash: Joi.string()
        .required()
        .pattern(new RegExp(/^\d{6}$/))
        .error(new CustomError("Hash must be 6 characters long", 400)),
    }).validateAsync(data);
  }
  static async PatchUserValidation(data: any) {
    return await Joi.object({
      full_name: Joi.string()
        .min(3)
        .error(new CustomError("Full name must be longer than 3 letters", 400)),
      email: Joi.string()
        .email()
        .error(new CustomError("Full name must be longer than 3 letters", 400)),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .error(new CustomError("Password", 400)),
    }).validateAsync(data);
  }
}
