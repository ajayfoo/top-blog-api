/** @type {import("express").RequestHandler} */
const onlyAuthor = async (req, res, next) => {
  if (typeof req.user === "undefined" || !req.user.isAuthor) {
    res.sendStatus(401);
    return;
  }
  next();
};

export { onlyAuthor };
