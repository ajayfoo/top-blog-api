import { db } from "../libs/db.js";
import multer from "multer";
import {
  createPostValidationMiddlewares,
  deletePostValidationMiddlewares,
  updatePostValidationMiddlewares,
} from "../validators/post.js";
import { updateFileUrlsInPostBody } from "../middlewares/media.js";

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
            isAuthor: true,
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

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.array("blob");
const createPostAndMiddlwares = [
  uploadMiddleware,
  ...createPostValidationMiddlewares,
  updateFileUrlsInPostBody,
  createPost,
];

/** @type {import("express").RequestHandler} */
const getPosts = async (req, res) => {
  const isFromAuthorFrontend =
    req.headers.origin === process.env.AUTHOR_FRONTEND_URL;
  const isAuthor = req.user?.isAuthor;
  if (isFromAuthorFrontend && !isAuthor) {
    return res.sendStatus(401);
  }

  try {
    if (isFromAuthorFrontend) {
      const posts = await db.post.findMany({
        where: {
          authorId: req.user.id,
        },
        include: {
          author: {
            select: {
              username: true,
            },
          },
        },
      });
      return res.send(posts);
    }
    const author = req.query.author;
    const posts = await db.post.findMany({
      where: {
        isHidden: false,
        ...(author
          ? {
              author: {
                username: author,
              },
            }
          : {}),
      },
      select: {
        id: true,
        title: true,
        body: true,
        updatedAt: true,
        author: {
          select: {
            username: true,
          },
        },
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
  const { id } = req.params;
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
        authorId: req.user.id,
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

const updatePostAndMiddlwares = [
  ...updatePostValidationMiddlewares,
  updatePost,
];

/** @type {import("express").RequestHandler} */
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await db.post.delete({
      where: { id, authorId: req.user.id },
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

const deletePostAndMiddlwares = [
  ...deletePostValidationMiddlewares,
  deletePost,
];

export {
  createPostAndMiddlwares,
  getPosts,
  updatePostAndMiddlwares,
  deletePostAndMiddlwares,
};
