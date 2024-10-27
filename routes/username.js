import { Router } from "express";
import { db } from "../libs/db.js";

const usernameRouter = Router();
usernameRouter.get("/", async (req, res) => {
  if (req.isAuthenticated()) {
    const isFromAuthorFrontend =
      req.headers.origin === process.env.AUTHOR_FRONTEND_URL;
    const result = await db.user.findUnique({
      where: {
        id: req.user.id,
        ...(isFromAuthorFrontend ? { isAdmin: true } : {}),
      },
      select: {
        username: true,
      },
    });
    if (result) {
      return res.send(result.username);
    }
  }
  return res.sendStatus(401);
});

export default usernameRouter;
