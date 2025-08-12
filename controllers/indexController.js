const { PrismaClient } = require("../generated/prisma");
const { createPasswordHash } = require("../lib/passwordUtils");
const path = require("node:path");
const links = [
  { href: "/", text: "Home" },
  { href: "/login", text: "Log In" },
  { href: "/signup", text: "Sign Up" },
  { href: "/upload", text: "Upload File" },
  { href: "/new-folder", text: "New folder" },
];

function indexGet(req, res) {
  res.render("index", { links });
}

function uploadFileGet(req, res) {
  res.render("formContainer", {
    title: "Upload file",
    formName: "upload",
    folders: [{ path: "/home/Documents", name: "Documents" }],
    links,
  });
}

async function uploadFilePost(req, res) {
  try {
    const savedFilePath = path.join(req.savedPath, req.savedFileName);
    const prisma = new PrismaClient();
    const file = await prisma.file.create({
      data: {
        userId: req.user.id,
        path: savedFilePath,
      },
    });

    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

function newFolderGet(req, res) {
  res.render("formContainer", {
    title: "New folder",
    formName: "folder",
    links,
  });
}

function newFolderPost(req, res) {
  const { folder } = req.body;

  res.redirect("/");
}

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
  indexGet,
  uploadFileGet,
  uploadFilePost,
  newFolderGet,
  newFolderPost,
  loginGet,
  signupGet,
  signupPost,
};
