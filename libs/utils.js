import jwt from "jsonwebtoken";
import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const parentFolder = dirname(fileURLToPath(import.meta.url));
const rootFolder = dirname(parentFolder);

const secret = fs.readFileSync(
  path.join(rootFolder, "secrets", "private-key.pem")
);

const createJWT = (payload) => {
  const token = jwt.sign(payload, secret, {
    algorithm: "RS256",
  });
  return token;
};

const getSecretForJWT = () => secret;

export { createJWT, getSecretForJWT };
