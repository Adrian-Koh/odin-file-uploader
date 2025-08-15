const { prisma } = require("../lib/prisma");
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

    const user = await prisma.user.create({
      data: {
        username: username,
        passwordHash: await createPasswordHash(password),
      },
    });

    res.redirect("/user/login");
  } catch (err) {
    next(err);
  }
}

function logOutGet(req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

module.exports = {
  loginGet,
  signupGet,
  signupPost,
  logOutGet,
};
