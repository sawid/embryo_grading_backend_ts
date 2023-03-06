const Joi = require("joi");

export const validateUser = async (user: any) => {
    //create schema
    const Schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });
    // check data from front-end
    return Schema.validate(user);
}

export const validateLogin = async (user: any) => {
    //create schema
    const Schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });
    // check data from front-end
    return Schema.validate(user);
}