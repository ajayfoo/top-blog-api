import { body, validationResult } from "express-validator";

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
  res.send(formattedErrors);
};

const signUpValidationMiddlewares = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 6, max: 36 })
    .withMessage("Username must be 6-36 characters long")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain alphabets, numbers or underscore"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .isStrongPassword({
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be strong and contain at least one uppercase letter, one lowercase letter, one number and one symbol from -#!$@£%^&*()_+|~=`{}[]:\";'<>?,./\\ "
    ),
  handleValidationResult,
];

const loginValidationMiddlewares = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationResult,
];

export { signUpValidationMiddlewares, loginValidationMiddlewares };
