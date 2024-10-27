import { Router } from "express";
import {
  createPostAndMiddlwares,
  updatePostAndMiddlwares,
  deletePostAndMiddlwares,
} from "../controllers/post.js";
import { onlyAuthor } from "../middlewares/author.js";
import commentRouter from "./comment.js";

const postRouter = Router();

postRouter.use("/:postId/comments", commentRouter);

postRouter.use(onlyAuthor);

postRouter.post("/", createPostAndMiddlwares);
postRouter.patch("/:id", updatePostAndMiddlwares);
postRouter.delete("/:id", deletePostAndMiddlwares);

export default postRouter;
