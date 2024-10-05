import { db } from "../libs/db.js";
import { createPostValidationMiddlewares } from "../validators/post.js";

/** @type {import("express").RequestHandler} */
const createPost = async (req, res) => {
  const authorId = req.user.id;
  const { title, body, isHidden } = req.body;
  try {
    const { id } = await db.post.create({
      data: {
        title,
        body,
        isHidden,
        author: {
          connect: {
            id: authorId,
            isAdmin: true,
          },
        },
      },
    });
    res.send(id.toString());
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const createPostAndMiddlwares = [createPostValidationMiddlewares, createPost];

/** @type {import("express").RequestHandler} */
const getPosts = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const posts = await db.post.findMany();
      res.send(posts);
      return;
    }
    const posts = await db.post.findMany({
      where: {
        isHidden: false,
      },
      select: {
        id: true,
        title: true,
        body: true,
      },
    });
    res.send(posts);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

/** @type {import("express").RequestHandler} */
const updatePost = async (req, res) => {
  const id = Number(req.params.id);
  const { title, body, isHidden } = req.body;
  try {
    await db.post.update({
      data: {
        title,
        body,
        isHidden,
      },
      where: {
        id,
      },
    });
    res.sendStatus(200);
    return;
  } catch (err) {
    console.error(err);
    if (err.code === "P2025") {
      res.status(404).send("Post not found");
      return;
    }
    res.sendStatus(500);
  }
};

const updatePostValidationMiddlewaresAndHandler = [
  ...createPostValidationMiddlewares,
  updatePost,
];

/** @type {import("express").RequestHandler} */
const deletePost = async (req, res) => {
  const id = Number(req.params.id);
  try {
    await db.post.delete({
      where: { id },
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    if (err.code === "P2025") {
      res.status(404).send("Post not found");
      return;
    }
    res.sendStatus(500);
  }
};

export {
  createPostAndMiddlwares,
  getPosts,
  updatePostValidationMiddlewaresAndHandler,
  deletePost,
};
