import express from "express";
import "dotenv/config";
import mainRouter from "./routes/index.js";

const DEFAULT_PORT = 3000;
const app = express();

app.use(mainRouter);

const port = process.env.PORT || DEFAULT_PORT;
app.listen(port, () => {
  console.log("Listening on PORT " + port);
});
