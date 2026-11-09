import joi from "joi";

export const productSchema = joi.object({
  name: joi.string().lowercase().required(),
  price: Joi.number().positive(),
  description: joi.string(),
  categories: joi.string(),
});