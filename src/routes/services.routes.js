import { Router } from "express";
import validateAuth from "../middlewares/validate.auth.middlewares.js";
import validateSchema from "../middlewares/validate.schema.middlewares.js";
import { serviceSchema, serviceAvailabilitySchema } from "../schemas/services.schemas.js";
import { postService, getService, deleteService, updateService, getAllServices } from "../controllers/services.controllers.js";
import { changeServiceAvailability } from "../repositories/services.repositories.js";
import reviewSchema  from "../schemas/reviews.schemas.js";
import createReview from "../controllers/reviews.controllers.js";

const servicesRouter = Router();

servicesRouter.post('/create-service', validateAuth, validateSchema(serviceSchema), postService);
servicesRouter.get('/service/:id', getService);
servicesRouter.get('/services', getAllServices);
servicesRouter.delete('/service/:id', validateAuth, deleteService);
servicesRouter.put('/service/:id', validateAuth, validateSchema(serviceSchema), updateService);
servicesRouter.patch('/service/:id',validateAuth, validateSchema(serviceAvailabilitySchema), changeServiceAvailability);
servicesRouter.post('/service/review/add',validateAuth, validateSchema(reviewSchema), createReview);

export default servicesRouter;