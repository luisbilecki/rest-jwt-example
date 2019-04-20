const Joi = require('joi');

const signInSchema = Joi.object().keys({
    userId: Joi.number().integer(),
    userEmail: Joi.string().email().required(),
    userName: Joi.string().required()
});

const validateLoginSchema = Joi.object().keys({
    token: Joi.string().email().required()
});

module.exports = {
    signInSchema,
    validateLoginSchema
};
