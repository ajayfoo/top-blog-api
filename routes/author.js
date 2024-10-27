import { Router } from "express";
import { becomeAuthor } from "../controllers/author.js";

const authorRouter = Router();

authorRouter.post("/", becomeAuthor);

export default authorRouter;
