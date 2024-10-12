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
    const { id, createdAt } = await db.comment.create({
      data: {
        post: {
          connect: {
            id: postId,
            ...(req.user.isAdmin ? {} : { isHidden: false }),
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
        createdAt: true,
      },
    });
    res.status(201).json({ id, createdAt });
  } catch (err) {
    console.error(err);
    if (err.code === "P2025") {
      res.status(404).send("Post not found");
      return;
    }
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
        ...(req.user?.isAdmin ? {} : { post: { isHidden: false } }),
      },
      select: {
        id: true,
        user: {
          select: {
            username: true,
          },
        },
        content: true,
        createdAt: true,
      },
    });
    comments.forEach((c) => {
      c.user = c.user.username;
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
    const { updatedAt } = await db.comment.update({
      data: {
        content,
      },
      where: {
        id,
        userId,
        postId,
        ...(req.user.isAdmin ? {} : { post: { isHidden: false } }),
      },
      select: {
        updatedAt: true,
      },
    });
    res.json({ updatedAt });
  } catch (err) {
    console.error(err);
    if (err.code === "P2025") {
      res.status(404).send("Comment not found");
      return;
    }
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
    if (req.user.isAdmin) {
      await db.comment.delete({
        where: {
          id,
          postId,
        },
      });
    } else {
      await db.comment.delete({
        where: {
          id,
          userId,
          postId,
          ...(req.user.isAdmin ? {} : { post: { isHidden: false } }),
        },
      });
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    if (err.code === "P2025") {
      res.status(404).send("Comment not found");
      return;
    }
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
