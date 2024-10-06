import { Router } from "express";
import publicPostRouter from "./post.js";
import { publicAuthMiddlware } from "../../middlewares/auth.js";

const publicRouter = Router();

publicRouter.use(publicAuthMiddlware);
publicRouter.use("/posts", publicPostRouter);

export default publicRouter;
