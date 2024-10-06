import { Router } from "express";
import {
  createCommentAndMiddlewares,
  getCommentsAndMiddlewars,
  updateCommentAndMiddlewares,
  deleteCommentAndMiddlewares,
} from "../controllers/comment.js";

const commentRouter = Router({ mergeParams: true });

commentRouter.post("/", createCommentAndMiddlewares);
commentRouter.get("/", getCommentsAndMiddlewars);
commentRouter.patch("/:id", updateCommentAndMiddlewares);
commentRouter.delete("/:id", deleteCommentAndMiddlewares);

export default commentRouter;
