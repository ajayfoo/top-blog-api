import express from "express";
import "dotenv/config";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import adminRouter from "./routes/admin.js";
import { authMiddleware } from "./middlewares/auth.js";

const DEFAULT_PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter);

app.use(authMiddleware);

app.get("/", (req, res) => {
  res.send("protected content");
});
app.use("/admins", adminRouter);
app.use("/posts", postRouter);

const port = process.env.PORT || DEFAULT_PORT;
app.listen(port, () => {
  console.log("Listening on PORT " + port);
});
