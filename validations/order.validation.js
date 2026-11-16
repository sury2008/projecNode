import Joi from "joi";

export const orderSchema = Joi.object({
    date: Joi.date(),
    address: Joi.object({
        city: Joi.string().required(),
        street: Joi.string(),
        num: Joi.number(),
    }),
    products: Joi.array().items(
        Joi.object({
            _id: Joi.string().hex().length(24).required(),
            name: Joi.string().required(),
            price: Joi.number(),
            amount: Joi.number(),
        })
    ).min(1).required(),
});