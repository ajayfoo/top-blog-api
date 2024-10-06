import { body, param } from "express-validator";
import { handleValidationResult } from "./utils.js";

const contentRule = body("content")
  .trim()
  .escape()
  .isLength({ min: 1, max: 500 })
  .withMessage("Body must be 1-500 characters long");
const postIdRuleAndSanitization = param("postId")
  .isInt({ min: 1 })
  .toInt()
  .withMessage("Post ID must be a +ve integer");
const commentIdRuleAndSanitization = param("commentId")
  .isInt({ min: 1 })
  .toInt()
  .withMessage("Comment ID must be a +ve integer");

const createCommentValidationAndSanitizationMiddlewares = [
  postIdRuleAndSanitization,
  contentRule,
  handleValidationResult,
];

const updateCommentValidationAndSanitizationMiddlewares = [
  postIdRuleAndSanitization,
  commentIdRuleAndSanitization,
  contentRule,
  handleValidationResult,
];

const getCommentsValidationAndSanitizationMiddlewares = [
  postIdRuleAndSanitization,
  handleValidationResult,
];

const deleteCommentsValidationAndSanitizationMiddlewares = [
  postIdRuleAndSanitization,
  commentIdRuleAndSanitization,
  handleValidationResult,
];

export {
  createCommentValidationAndSanitizationMiddlewares,
  getCommentsValidationAndSanitizationMiddlewares,
  updateCommentValidationAndSanitizationMiddlewares,
  deleteCommentsValidationAndSanitizationMiddlewares,
};
