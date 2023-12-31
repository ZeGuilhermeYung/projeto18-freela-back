import joi from 'joi';

const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
    phone: joi.number().integer().required(),
    city:joi.string().required()
});

export default userSchema;