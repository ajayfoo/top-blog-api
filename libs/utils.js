import jwt from "jsonwebtoken";
import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";

const parentFolder = dirname(fileURLToPath(import.meta.url));
const rootFolder = dirname(parentFolder);

const secret = fs.readFileSync(
  path.join(rootFolder, "secrets", "private-key.pem")
);

const createJWT = (sub) => {
  const token = jwt.sign({ sub }, secret, {
    algorithm: "RS256",
    ...getJWTOptions(),
  });
  return token;
};

const getSecretForJWT = () => secret;
const getJWTOptions = () => ({
  audience: process.env.JWT_AUDIENCE,
  issuer: process.env.JWT_ISSUER,
});

export { createJWT, getSecretForJWT, getJWTOptions };
