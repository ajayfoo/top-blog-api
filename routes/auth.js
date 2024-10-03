import { Router } from "express";
import { signUp } from "../controllers/auth.js";

const router = Router();

router.post("/sign-up", signUp);
router.get("/login", (req, res) => {
  res.send("login");
});

export default router;
