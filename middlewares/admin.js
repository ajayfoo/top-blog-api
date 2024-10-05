/** @type {import("express").RequestHandler} */
const onlyAdmin = async (req, res, next) => {
  if (typeof req.user === "undefined" || !req.user.isAdmin) {
    res.sendStatus(401);
    return;
  }
  next();
};

export { onlyAdmin };
