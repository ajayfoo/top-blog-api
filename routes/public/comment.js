import { Router } from "express";
import { getCommentsAndMiddlewars } from "../../controllers/comment.js";

const publicCommentRouter = Router({ mergeParams: true });

publicCommentRouter.get("/", getCommentsAndMiddlewars);

export default publicCommentRouter;
