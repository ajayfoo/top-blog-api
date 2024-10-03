import { Strategy, ExtractJwt } from "passport-jwt";
import { db } from "../db.js";
import passport from "passport";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    console.log("hi");
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
        console.log("hi");
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
