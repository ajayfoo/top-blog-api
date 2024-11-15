import { Router } from "express";
import {
  createCommentAndMiddlewares,
  updateCommentAndMiddlewares,
  deleteCommentAndMiddlewares,
} from "../controllers/comments.js";

const commentRouter = Router({ mergeParams: true });

commentRouter.post("/", createCommentAndMiddlewares);
commentRouter.patch("/:id", updateCommentAndMiddlewares);
commentRouter.delete("/:id", deleteCommentAndMiddlewares);

export default commentRouter;
