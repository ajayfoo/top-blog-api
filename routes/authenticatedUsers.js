import { Router } from "express";

const authenticatedUsersRouter = Router();
authenticatedUsersRouter.head("/", (req, res) => {
  if (req.isAuthenticated()) {
    return res.sendStatus(200);
  }
  return res.sendStatus(401);
});

export default authenticatedUsersRouter;
