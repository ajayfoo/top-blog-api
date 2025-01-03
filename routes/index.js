import { Router } from "express";
import express from "express";
import authRouter from "./auth.js";
import usersRouter from "./users.js";
import postRouter from "./posts.js";
import authorRouter from "./authors.js";
import { authMiddleware } from "../middlewares/auth.js";
import publicRouter from "./public/index.js";
import cors from "cors";
import "dotenv/config";

const mainRouter = Router();

mainRouter.use(express.urlencoded({ extended: true }));
mainRouter.use(express.json());
mainRouter.use(
  cors({
    origin: [process.env.VIEWER_FRONTEND_URL, process.env.AUTHOR_FRONTEND_URL],
  })
);

mainRouter.use("/", publicRouter);
mainRouter.use("/auth", authRouter);

mainRouter.use(authMiddleware);

mainRouter.use("/users", usersRouter);
mainRouter.use("/authors", authorRouter);
mainRouter.use("/posts", postRouter);

export default mainRouter;
