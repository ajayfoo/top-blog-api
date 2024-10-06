import { Router } from "express";
import {
  createCommentMiddlewaresAndHandler,
  deleteCommentMiddlewaresAndHandler,
  getCommentsMiddlewarsAndHandler,
  updateCommentMiddlewaresAndHandler,
} from "../controllers/comment.js";

const commentRouter = Router({ mergeParams: true });

commentRouter.post("/", createCommentMiddlewaresAndHandler);
commentRouter.get("/", getCommentsMiddlewarsAndHandler);
commentRouter.patch("/:commentId", updateCommentMiddlewaresAndHandler);
commentRouter.delete("/:commentId", deleteCommentMiddlewaresAndHandler);

export default commentRouter;
