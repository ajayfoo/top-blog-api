import { db } from "../libs/db.js";
import {
  createCommentValidationAndSanitizationMiddlewares,
  deleteCommentsValidationAndSanitizationMiddlewares,
  getCommentsValidationAndSanitizationMiddlewares,
  updateCommentValidationAndSanitizationMiddlewares,
} from "../validators/comment.js";

/** @type {import("express").RequestHandler} */
const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    const { content } = req.body;
    const { id } = await db.comment.create({
      data: {
        post: {
          connect: {
            id: postId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        content,
      },
      select: {
        id: true,
      },
    });
    res.status(201).send(id.toString());
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const createCommentMiddlewaresAndHandler = [
  ...createCommentValidationAndSanitizationMiddlewares,
  createComment,
];

/** @type {import("express").RequestHandler} */
const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await db.comment.findMany({
      where: {
        postId,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    res.send(comments);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getCommentsMiddlewarsAndHandler = [
  ...getCommentsValidationAndSanitizationMiddlewares,
  getComments,
];

/** @type {import("express").RequestHandler} */
const updateComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const userId = req.user.id;
    const { content } = req.body;
    await db.comment.update({
      data: {
        content,
      },
      where: {
        id: commentId,
        userId,
        postId,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const updateCommentMiddlewaresAndHandler = [
  ...updateCommentValidationAndSanitizationMiddlewares,
  updateComment,
];

/** @type {import("express").RequestHandler} */
const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const userId = req.user.id;
    await db.comment.delete({
      where: {
        id: commentId,
        userId,
        postId,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const deleteCommentMiddlewaresAndHandler = [
  ...deleteCommentsValidationAndSanitizationMiddlewares,
  deleteComment,
];

export {
  createCommentMiddlewaresAndHandler,
  getCommentsMiddlewarsAndHandler,
  updateCommentMiddlewaresAndHandler,
  deleteCommentMiddlewaresAndHandler,
};
