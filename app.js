require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("./generated/prisma");
const passport = require("passport");
const indexRouter = require("./routes/indexRouter");
const userRouter = require("./routes/userRouter");
const folderRouter = require("./routes/folderRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(
  expressSession({
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
    }),
  })
);

// passport
require("./passport");
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.user);
  next();
});

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/folder", folderRouter);

// catch all errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
