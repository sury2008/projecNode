import Joi from "joi";

export const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().positive(),
    description: Joi.string().allow(""),
    categories: Joi.array().items(Joi.string()),
});