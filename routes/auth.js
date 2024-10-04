import { Router } from "express";
import {
  loginAndMiddlewares,
  signUpAndMiddlewares,
} from "../controllers/auth.js";

const router = Router();

router.post("/sign-up", signUpAndMiddlewares);
router.post("/login", loginAndMiddlewares);

export default router;
