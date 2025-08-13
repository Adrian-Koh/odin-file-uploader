const { PrismaClient } = require("../generated/prisma");
const { createPasswordHash } = require("../lib/passwordUtils");
const { links } = require("../lib/navLinks");

function loginGet(req, res) {
  res.render("formContainer", { title: "Log In", formName: "login", links });
}

function signupGet(req, res) {
  res.render("formContainer", { title: "Sign Up", formName: "signup", links });
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

module.exports = {
  loginGet,
  signupGet,
  signupPost,
};
