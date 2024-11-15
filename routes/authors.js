import { Router } from "express";
import { becomeAuthor } from "../controllers/authors.js";

const authorRouter = Router();

authorRouter.post("/", becomeAuthor);

export default authorRouter;
