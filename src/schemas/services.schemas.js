import joi from 'joi';

const serviceSchema = joi.object({
    name: joi.string().required(),
    workerId:joi.number().integer().required(),
    description: joi.string().required(), 
    category: joi.number().integer().required(), 
    photo: joi.string().uri().required(),
    price:joi.number().integer().required(), 
    availability:joi.boolean().required()
});


const serviceAvailabilitySchema = joi.object({
    availability:joi.boolean().required()
});

export { serviceSchema, serviceAvailabilitySchema };