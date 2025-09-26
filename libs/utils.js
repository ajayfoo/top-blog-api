import jwt from "jsonwebtoken";
import "dotenv/config";

if (!process.env.JWT_KEY) {
  throw new Error("JWT Key was not provided");
}
const secret = process.env.JWT_KEY.replace(/\\n/g, "\n");

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
