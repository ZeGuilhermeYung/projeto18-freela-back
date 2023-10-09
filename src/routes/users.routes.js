import { Router } from "express";
import validateAuth from "../middlewares/validate.auth.middlewares.js";
import getUser from "../controllers/users.controllers.js";

const usersRouter = Router();

usersRouter.get('/users/me',validateAuth, getUser);

export default usersRouter;