import { Router } from "express";
import validateAuth from "../middlewares/validate.auth.middlewares.js";
import validateSchema from "../middlewares/validate.schema.middlewares.js";
import { serviceSchema, serviceAvailabilitySchema } from "../schemas/services.schemas.js";
import { postService, getService, deleteService, updateService, changeServiceAvailability, getAllServices } from "../controllers/services.controllers.js";
import { ReviewSchema } from "../schemas/review.schemas.js";
import { insertReview } from "../controllers/review.controllers.js";

const servicesRouter = Router();

servicesRouter.post('/create-service', validateAuth, validateSchema(serviceSchema), postService);
servicesRouter.get('/service/:id', getService);
servicesRouter.get('/services', getAllServices);
servicesRouter.delete('/service/:id', validateAuth, deleteService);
servicesRouter.put('/service/:id', validateAuth, validateSchema(serviceSchema), updateService);
servicesRouter.patch('/service/:id',validateAuth, validateSchema(serviceAvailabilitySchema), changeServiceAvailability);
servicesRouter.post('/service/review/add',validateAuth, validateSchema(ReviewSchema), insertReview);

export default servicesRouter;