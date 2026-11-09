import joi from "joi";

export const signInSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

export const registerSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    repeatPassword: Joi.string().valid(Joi.ref("password")).required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
});

export const updatePasswordSchema = Joi.object({
    password: Joi.string().required(),
    repeatPassword: Joi.string().valid(Joi.ref("password")).required(),
});