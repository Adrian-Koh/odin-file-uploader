const { PrismaClient } = require("../generated/prisma");
const { createPasswordHash } = require("../lib/passwordUtils");
const links = [
  { href: "/", text: "Home" },
  { href: "/login", text: "Log In" },
  { href: "/signup", text: "Sign Up" },
  { href: "/upload", text: "Upload File" },
];

function indexGet(req, res) {
  res.render("index", { links });
}

function uploadFileGet(req, res) {
  res.render("file-upload-form", { links });
}

function loginGet(req, res) {
  res.render("login", { links });
}

function signupGet(req, res) {
  res.render("signup", { links });
}

async function signupPost(req, res, next) {
  try {
    const { username, password } = req.body;
    const prisma = new PrismaClient();
    const user = await prisma.user.create({
      data: {
        username: username,
        passwordHash: await createPasswordHash(password),
      },
    });

    res.redirect("/login");
  } catch (err) {
    next(err);
  }
}

module.exports = { indexGet, uploadFileGet, loginGet, signupGet, signupPost };
