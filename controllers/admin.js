import "dotenv/config";
import { db } from "../libs/db.js";
/** @type {import("express").RequestHandler} */
const becomeAdmin = async (req, res) => {
  const { passcode } = req.body;
  if (passcode !== process.env.AUTHOR_PASSCODE) {
    res.status(401).send("Wrong passcode");
    return;
  }
  const userId = req.user.id;
  try {
    await db.user.update({
      data: {
        isAdmin: true,
      },
      where: {
        id: userId,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export { becomeAdmin };
