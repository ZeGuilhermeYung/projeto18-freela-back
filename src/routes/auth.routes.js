import { Router } from "express";
import userSchema from "../schemas/users.schemas.js";
import authSchema from "../schemas/auth.schemas.js";
import { signUp, signIn } from "../controllers/auth.controllers.js";
import validateSchema from "../middlewares/validate.schema.middlewares.js";

const authRouter = Router();

authRouter.post('/signup',validateSchema(userSchema), signUp);
authRouter.post('/signin',validateSchema(authSchema), signIn);

export default authRouter;