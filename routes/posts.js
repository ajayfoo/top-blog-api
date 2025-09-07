import { Router } from "express";
import {
  createPostAndMiddlwares,
  updatePostAndMiddlwares,
  deletePostAndMiddlwares,
  updateIsHiddenAndMiddlwares,
} from "../controllers/posts.js";
import { onlyAuthor } from "../middlewares/author.js";
import commentRouter from "./comments.js";

const postRouter = Router();

postRouter.use("/:postId/comments", commentRouter);

postRouter.use(onlyAuthor);

postRouter.post("/", createPostAndMiddlwares);
postRouter.patch("/:id", updatePostAndMiddlwares);
postRouter.delete("/:id", deletePostAndMiddlwares);
postRouter.patch("/:id/isHidden", updateIsHiddenAndMiddlwares);

export default postRouter;
