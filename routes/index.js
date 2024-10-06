import { Router } from "express";
import express from "express";
import authRouter from "./auth.js";
import postRouter from "./post.js";
import adminRouter from "./admin.js";
import { authMiddleware } from "../middlewares/auth.js";
import publicRouter from "./public/index.js";

const mainRouter = Router();

mainRouter.use(express.urlencoded({ extended: true }));
mainRouter.use(express.json());

mainRouter.use("/", publicRouter);
mainRouter.use("/auth", authRouter);

mainRouter.use(authMiddleware);

mainRouter.use("/admins", adminRouter);
mainRouter.use("/posts", postRouter);

export default mainRouter;