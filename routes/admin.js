import { Router } from "express";
import { becomeAdmin } from "../controllers/admin.js";

const adminRouter = Router();

adminRouter.post("/", becomeAdmin);

export default adminRouter;
