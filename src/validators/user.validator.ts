import Joi from "joi";

import { regexConstants } from "../constants";
import { EGenders } from "../enums/user.enums";

export class UserValidator {
  static age = Joi.number().min(1).max(100);
  static firstName = Joi.string().min(3).max(30).trim();
  static gender = Joi.valid(...Object.values(EGenders));
  static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .trim()
    .required();
  static password = Joi.string()
    .regex(regexConstants.PASSWORD)
    .trim()
    .required();
  static create = Joi.object({
    name: this.firstName.required(),
    age: this.age.required(),
    gender: this.gender.required(),
    email: this.email.required(),
    password: this.password.required(),
  });
  static update = Joi.object({
    name: this.firstName,
    age: this.age,
    gender: this.gender,
  });
}
