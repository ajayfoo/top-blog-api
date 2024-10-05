import { Router } from "express";
import { createPostAndMiddlwares } from "../controllers/post.js";

const postRouter = Router();

postRouter.post("/", createPostAndMiddlwares);

export default postRouter;
