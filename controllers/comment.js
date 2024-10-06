import { db } from "../libs/db.js";
import {
  createCommentValidationMiddlewars,
  deleteCommentValidationMiddlewars,
  getCommentsValidationMiddlewars,
  updateCommentValidationMiddlewars,
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

const createCommentAndMiddlewares = [
  ...createCommentValidationMiddlewars,
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

const getCommentsAndMiddlewars = [
  ...getCommentsValidationMiddlewars,
  getComments,
];

/** @type {import("express").RequestHandler} */
const updateComment = async (req, res) => {
  try {
    const { postId, id } = req.params;
    const userId = req.user.id;
    const { content } = req.body;
    await db.comment.update({
      data: {
        content,
      },
      where: {
        id,
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

const updateCommentAndMiddlewares = [
  ...updateCommentValidationMiddlewars,
  updateComment,
];

/** @type {import("express").RequestHandler} */
const deleteComment = async (req, res) => {
  try {
    const { postId, id } = req.params;
    const userId = req.user.id;
    await db.comment.delete({
      where: {
        id,
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

const deleteCommentAndMiddlewares = [
  ...deleteCommentValidationMiddlewars,
  deleteComment,
];

export {
  createCommentAndMiddlewares,
  getCommentsAndMiddlewars,
  updateCommentAndMiddlewares,
  deleteCommentAndMiddlewares,
};
