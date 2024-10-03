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
          id: payload.id,
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

const authMiddleware = passport.authenticate("jwt", {
  session: false,
});
export { authMiddleware };
