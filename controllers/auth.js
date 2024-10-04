import bcrypt from "bcrypt";
import "dotenv/config";
import { db } from "../libs/db.js";
import { createJWT } from "../libs/utils.js";
import {
  loginValidationMiddlewares,
  signUpValidationMiddlewares,
} from "../validators/auth.js";

/** @type {import("express").RequestHandler} */
const signUp = async (req, res) => {
  const { username, password } = req.body;
  const DEFAULT_SALT_ROUNDS = 12;
  const saltRounds = parseInt(process.env.SALT_ROUNDS) || DEFAULT_SALT_ROUNDS;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const { id } = await db.user.create({
      data: {
        username,
        password: encryptedPassword,
      },
      select: { id: true },
    });
    const jwt = createJWT(id);
    res.cookie("jwt", jwt);
    res.send(jwt);
  } catch (err) {
    console.error(err);
    if (err.code === "P2002") {
      res.sendStatus(403);
      return;
    }
    res.sendStatus(500);
  }
};

const signUpAndMiddlewares = [signUpValidationMiddlewares, signUp];

/** @type {import("express").RequestHandler} */
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        password: true,
      },
    });
    if (!user) {
      res.sendStatus(404);
      return;
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (isCorrectPassword) {
      const jwt = createJWT(user.id);
      res.cookie("jwt", jwt);
      res.send(jwt);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    req.sendStatus(500);
  }
};

const loginAndMiddlewares = [loginValidationMiddlewares, login];

export { signUpAndMiddlewares, loginAndMiddlewares };
