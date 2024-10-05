import { db } from "../libs/db.js";
import { createPostValidationMiddlewares } from "../validators/post.js";

/** @type {import("express").RequestHandler} */
const createPost = async (req, res) => {
  if (!req.user.isAdmin) {
    res.sendStatus(401);
    return;
  }
  const authorId = req.user.id;
  const { title, body } = req.body;
  const isHidden = Boolean(req.isHidden);
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

export { createPostAndMiddlwares, getPosts };
