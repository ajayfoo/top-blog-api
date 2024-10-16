import { Router } from "express";
import {
  loginAndMiddlewares,
  lookupAvailableUsername,
  signUpAndMiddlewares,
} from "../controllers/auth.js";

const router = Router();

router.post("/sign-up", signUpAndMiddlewares);
router.post("/login", loginAndMiddlewares);
router.head("/available-usernames/:username", lookupAvailableUsername);

export default router;
