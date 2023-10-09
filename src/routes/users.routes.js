import { Router } from "express";
import validateAuth from "../middlewares/validate.auth.middlewares.js";
import { getUser, getUserServices } from "../controllers/users.controllers.js";

const usersRouter = Router();

usersRouter.get('/users/me',validateAuth, getUser);
usersRouter.get('/user/services/:id', validateAuth, getUserServices);

export default usersRouter;