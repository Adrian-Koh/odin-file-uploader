require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");

app.use(
  expressSession({
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
    }),
  })
);

const PORT = 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
