const { PrismaClient } = require("../generated/prisma");
const path = require("node:path");
const { links } = require("../lib/navLinks");
const fs = require("node:fs");

async function indexGet(req, res) {
  try {
    let folders = null;
    let filesWithNoFolder = null;
    if (req.user) {
      const prisma = new PrismaClient();
      folders = await prisma.folder.findMany({
        where: {
          userId: req.user.id,
        },
      });
      filesWithNoFolder = await prisma.file.findMany({
        where: {
          userId: req.user.id,
          folder: null,
        },
      });
    }
    res.render("index", { links, folders, files: filesWithNoFolder });
  } catch (err) {
    next(err);
  }
}

async function uploadFileGet(req, res, next) {
  try {
    const prisma = new PrismaClient();
    const folders = await prisma.folder.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.render("formContainer", {
      title: "Upload file",
      formName: "upload",
      folders,
      links,
    });
  } catch (err) {
    next(err);
  }
}

async function uploadFilePost(req, res, next) {
  try {
    let savedFilePath = path.join(req.savedPath, req.savedFileName);
    const prisma = new PrismaClient();

    if (req.body.folder !== "novalue") {
      const folder = await prisma.folder.findUnique({
        where: {
          id: parseInt(req.body.folder),
        },
      });
      const newFilePath = path.join(
        req.savedPath,
        folder.name,
        req.savedFileName
      );

      fs.renameSync(savedFilePath, newFilePath);
      savedFilePath = newFilePath;
    }

    const file = await prisma.file.create({
      data: {
        userId: req.user.id,
        path: savedFilePath,
        folderId:
          req.body.folder === "novalue" ? null : parseInt(req.body.folder),
      },
    });

    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  indexGet,
  uploadFileGet,
  uploadFilePost,
};
