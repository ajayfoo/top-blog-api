import { Router } from "express";
import { db } from "../libs/db.js";

const usersRouter = Router();
usersRouter.get("/", async (req, res) => {
  if (req.isAuthenticated()) {
    const isFromAuthorFrontend =
      req.headers.origin === process.env.AUTHOR_FRONTEND_URL;
    const result = await db.user.findUnique({
      where: {
        id: req.user.id,
        ...(isFromAuthorFrontend ? { isAuthor: true } : {}),
      },
      select: {
        username: true,
        isAuthor: true,
      },
    });
    if (result) {
      const user = {
        username: result.username,
        isAuthor: result.isAuthor,
      };
      return res.json(user);
    }
  }
  return res.sendStatus(401);
});

export default usersRouter;
