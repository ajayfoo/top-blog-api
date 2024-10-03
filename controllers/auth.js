import bcrypt from "bcrypt";
import "dotenv/config";
import { db } from "../db.js";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
  const { username, password } = req.body;
  const DEFAULT_SALT_ROUNDS = 12;
  const saltRounds = parseInt(process.env.SALT_ROUNDS) || DEFAULT_SALT_ROUNDS;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  const user = await db.user.create({
    data: {
      username,
      password: encryptedPassword,
    },
    select: { id: true },
  });
  const privateKey = "secret";
  const token = jwt.sign(user, privateKey);
  console.log(token);
  res.cookie("jwt", token);
  res.send(token);
};

export { signUp };
