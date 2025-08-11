const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { PrismaClient } = require("./generated/prisma");
const { validPassword } = require("./lib/passwordUtils");

async function verifyCallback(username, password, done) {
  try {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) {
      done(null, false);
    }

    const isValid = await validPassword(password, user.passwordHash);

    if (isValid) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err);
  }
}

const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userid, done) => {
  const prisma = new PrismaClient();
  prisma.user
    .findUnique({
      where: { id: userid },
    })
    .then((user) => done(null, user))
    .catch((err) => done(err));
});
