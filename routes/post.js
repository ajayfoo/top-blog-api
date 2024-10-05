import { Router } from "express";
import { createPostAndMiddlwares, getPosts } from "../controllers/post.js";

const postRouter = Router();

postRouter.post("/", createPostAndMiddlwares);
postRouter.get("/", getPosts);

export default postRouter;
