import { body, param } from "express-validator";
import { handleValidationResult } from "./utils.js";

const contentRule = body("content")
  .trim()
  .escape()
  .isLength({ min: 1, max: 500 })
  .withMessage("Body must be 1-500 characters long");
const postIdRuleAndSanitization = param("postId")
  .isInt({ min: 1 })
  .withMessage("Post ID must be a +ve integer")
  .toInt();
const commentIdRuleAndSanitization = param("id")
  .isInt({ min: 1 })
  .withMessage("Comment ID must be a +ve integer")
  .toInt();

const createCommentValidationMiddlewars = [
  postIdRuleAndSanitization,
  contentRule,
  handleValidationResult,
];

const updateCommentValidationMiddlewars = [
  postIdRuleAndSanitization,
  commentIdRuleAndSanitization,
  contentRule,
  handleValidationResult,
];

const getCommentsValidationMiddlewars = [
  postIdRuleAndSanitization,
  handleValidationResult,
];

const deleteCommentValidationMiddlewars = [
  postIdRuleAndSanitization,
  commentIdRuleAndSanitization,
  handleValidationResult,
];

export {
  createCommentValidationMiddlewars,
  getCommentsValidationMiddlewars,
  updateCommentValidationMiddlewars,
  deleteCommentValidationMiddlewars,
};
