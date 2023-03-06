const Joi = require("joi");

export const validateMatchData = async (data: any) => {
    //create schema
    const Schema = Joi.object({
        imageId: Joi.string().required(),
        imageName: Joi.string().required(),
        grade: Joi.string().required(),
    });
    // check data from front-end
    return Schema.validate(data);
}

export const validateCreateData = async (data: any) => {
    //create schema
    const Schema = Joi.object({
        imageId: Joi.string().required(),
        imageName: Joi.string().required(),
    });
    // check data from front-end
    return Schema.validate(data);
}