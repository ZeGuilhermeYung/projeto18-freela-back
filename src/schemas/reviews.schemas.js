import joi from 'joi';

const reviewSchema = joi.object({
    text_description: joi.string().required(),
    rating:joi.number().integer().required(),
    service_id:joi.number().integer().required(),
    customer_id:joi.number().integer().required(),
});

export default reviewSchema;