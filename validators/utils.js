import { validationResult } from "express-validator";

/** @type {import("express").RequestHandler} */
const handleValidationResult = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    next();
    return;
  }
  const formattedErrors = result
    .array()
    .map((e) => ({ msg: e.msg, path: e.path }));
  res.status(400).send(formattedErrors);
};

export { handleValidationResult };
