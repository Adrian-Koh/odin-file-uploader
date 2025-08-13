const { PrismaClient } = require("../generated/prisma");
const path = require("node:path");
const { links } = require("../lib/navLinks");
const fs = require("node:fs");
const { DOWNLOAD_PATH } = require("../lib/multer");

function newFolderGet(req, res) {
  res.render("formContainer", {
    title: "New folder",
    formName: "folder",
    links,
  });
}

async function newFolderPost(req, res, next) {
  try {
    const { folder } = req.body;

    if (fs.existsSync(path.join(DOWNLOAD_PATH, folder))) {
      throw new Error(
        `Folder ${path.join(DOWNLOAD_PATH, folder)} already exists.`
      );
    }

    const prisma = new PrismaClient();
    const createdFolder = await prisma.folder.create({
      data: {
        name: folder,
        userId: req.user.id,
      },
    });
    fs.mkdirSync(path.join(DOWNLOAD_PATH, folder));
    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

async function folderGet(req, res) {
  const { folderId } = req.params;
  const prisma = new PrismaClient();
  const folder = await prisma.folder.findUnique({
    where: {
      id: parseInt(folderId),
    },
  });
  const files = await prisma.file.findMany({
    where: {
      userId: req.user.id,
      folderId: parseInt(folderId),
    },
  });
  res.render("folder", { folder, files, links });
}

module.exports = {
  newFolderGet,
  newFolderPost,
  folderGet,
};
