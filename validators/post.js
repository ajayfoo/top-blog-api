import { body, param } from "express-validator";
import { handleValidationResult } from "./utils.js";

const titleValidation = body("title")
  .trim()
  .escape()
  .isLength({ min: 1, max: 200 })
  .withMessage("Title must be 1-200 characters long");
const bodyValidation = body("body")
  .trim()
  .isLength({ min: 1, max: 20_000 })
  .withMessage("Body must be 1-20000 characters long");
const isHiddenValidation = body("isHidden")
  .isBoolean()
  .withMessage("isHidden must be a boolean: [true, false, 0, 1]")
  .toBoolean();

const createPostValidationMiddlewares = [
  titleValidation,
  bodyValidation,
  isHiddenValidation,
  handleValidationResult,
];
const postIdValidation = param("id")
  .isInt({ min: 1 })
  .withMessage("Comment ID must be a +ve integer")
  .toInt();

const updatePostValidationMiddlewares = [
  postIdValidation,
  titleValidation,
  bodyValidation,
  isHiddenValidation,
  handleValidationResult,
];

const deletePostValidationMiddlewares = [
  postIdValidation,
  handleValidationResult,
];

export {
  createPostValidationMiddlewares,
  updatePostValidationMiddlewares,
  deletePostValidationMiddlewares,
};
