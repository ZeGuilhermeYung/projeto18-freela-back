import { Router } from "express";
import usersRouter from "./users.routes.js";
import authRouter from "./auth.routes.js";
import servicesRouter from "./services.routes.js";

const router = Router();

router.use(usersRouter);
router.use(authRouter);
router.use(servicesRouter);

export default router;