import { Router } from "express";
import {
  createPostAndMiddlwares,
  getPosts,
  updatePostAndMiddlwares,
  deletePostAndMiddlwares,
} from "../controllers/post.js";
import { onlyAdmin } from "../middlewares/admin.js";
import commentRouter from "./comment.js";

const postRouter = Router();

postRouter.get("/", getPosts);
postRouter.use("/:postId/comments", commentRouter);

postRouter.use(onlyAdmin);

postRouter.post("/", createPostAndMiddlwares);
postRouter.patch("/:id", updatePostAndMiddlwares);
postRouter.delete("/:id", deletePostAndMiddlwares);

export default postRouter;
