import { Router } from "express";
import { getPosts } from "../../controllers/posts.js";
import publicCommentRouter from "./comment.js";

const publicPostRouter = Router();

publicPostRouter.get("/", getPosts);
publicPostRouter.use("/:postId/comments", publicCommentRouter);

export default publicPostRouter;
