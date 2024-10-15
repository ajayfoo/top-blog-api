import { Router } from "express";
import { db } from "../libs/db.js";

const usernameRouter = Router();
usernameRouter.get("/", async (req, res) => {
  if (req.isAuthenticated()) {
    const { username } = await db.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        username: true,
      },
    });
    return res.send(username);
  }
  return res.sendStatus(401);
});

export default usernameRouter;
