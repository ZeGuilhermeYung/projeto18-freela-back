import { Router } from "express";
import validateAuth from "../middlewares/validate.auth.middlewares.js";
import validateSchema from "../middlewares/validate.schema.middlewares.js";
import { ServiceAvailableSchema, ServiceSchema } from "../schemas/services.schemas.js";
import { createService, deleteService, changeServiceStatus, editService, getAllServices, getService, getServicesFromUser } from "../controllers/services.controllers.js";
import { ReviewSchema } from "../schemas/review.schemas.js";
import { insertReview } from "../controllers/review.controllers.js";

const servicesRouter = Router();

servicesRouter.post('/create-service', validateAuth, validateSchema(ServiceSchema), createService);
servicesRouter.get('/service/:id', getService);
servicesRouter.get('/services', getAllServices);
servicesRouter.get('/services/user/:id', validateAuth, getServicesFromUser);
servicesRouter.delete('/service/:id', validateAuth, deleteService);
servicesRouter.put('/service/:id', validateAuth, validateSchema(ServiceSchema), editService);
servicesRouter.patch('/service/:id',validateAuth, validateSchema(ServiceAvailableSchema), changeServiceStatus);
servicesRouter.post('/service/review/new',validateAuth, validateSchema(ReviewSchema), insertReview);

export default servicesRouter;