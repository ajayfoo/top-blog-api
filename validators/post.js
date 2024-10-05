import { body } from "express-validator";
import { handleValidationResult } from "./utils.js";

const createPostValidationMiddlewares = [
  body("title")
    .trim()
    .escape()
    .isLength({ min: 1, max: 200 })
    .withMessage("Title must be 1-200 characters long"),
  body("body")
    .trim()
    .escape()
    .isLength({ min: 1, max: 20_000 })
    .withMessage("Body must be 1-20000 characters long"),
  body("isHidden")
    .trim()
    .isBoolean()
    .withMessage("isHidden must be a boolean: ['true', 'false', '0', '1']"),
  handleValidationResult,
];

export { createPostValidationMiddlewares };
