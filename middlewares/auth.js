import { Strategy, ExtractJwt } from "passport-jwt";
import { db } from "../libs/db.js";
import passport from "passport";
import { getJWTOptions, getSecretForJWT } from "../libs/utils.js";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: getSecretForJWT(),
  jsonWebTokenOptions: getJWTOptions(),
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await db.user.findUnique({
        where: {
          id: payload.sub,
        },
        select: {
          id: true,
          isAuthor: true,
        },
      });
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err);
    }
  })
);

/** @type {import("express").RequestHandler} */
const authMiddleware = (req, res, next) => {
  if (req.user) {
    return next();
  }
  passport.authenticate("jwt", {
    session: false,
  })(req, res, next);
};

/** @type {import("express").RequestHandler} */
const publicAuthMiddlware = (req, res, next) => {
  passport.authenticate(
    "jwt",
    {
      session: false,
    },
    (err, user) => {
      req.user = user;
      next();
    }
  )(req, res, next);
};

export { authMiddleware, publicAuthMiddlware };
