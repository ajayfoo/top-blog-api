import { Router } from "express";
import { getCommentsAndMiddlewars } from "../../controllers/comments.js";

const publicCommentRouter = Router({ mergeParams: true });

publicCommentRouter.get("/", getCommentsAndMiddlewars);

export default publicCommentRouter;
