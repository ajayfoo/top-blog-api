import { Router } from "express";
import {
  createPostAndMiddlwares,
  deletePost,
  getPosts,
  updatePostValidationMiddlewaresAndHandler,
} from "../controllers/post.js";
import { onlyAdmin } from "../middlewares/admin.js";

const postRouter = Router();

postRouter.get("/", getPosts);

postRouter.use(onlyAdmin);

postRouter.post("/", createPostAndMiddlwares);
postRouter.patch("/:id", updatePostValidationMiddlewaresAndHandler);
postRouter.delete("/:id", deletePost);

export default postRouter;
