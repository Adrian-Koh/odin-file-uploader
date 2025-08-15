const { prisma } = require("../lib/prisma");
const path = require("node:path");
const { links } = require("../lib/navLinks");
const fs = require("node:fs");
const { DOWNLOAD_PATH } = require("../lib/multer");

function newFolderGet(req, res) {
  res.render("formContainer", {
    title: "New folder",
    formName: "folder",
    links,
    postLink: "/folder/new",
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

async function folderDeleteGet(req, res, next) {
  const { folderId } = req.params;
  const files = await prisma.file.deleteMany({
    where: {
      folderId: parseInt(folderId),
    },
  });
  const folder = await prisma.folder.delete({
    where: {
      id: parseInt(folderId),
    },
  });
  res.redirect("/");
}

async function editFolderGet(req, res, next) {
  const { folderId } = req.params;
  const folder = await prisma.folder.findUnique({
    where: {
      id: parseInt(folderId),
    },
  });
  res.render("formContainer", {
    title: "Update folder",
    formName: "folder",
    links,
    postLink: "/folder/edit/" + folderId,
    folderName: folder.name,
  });
}

async function editFolderPost(req, res, next) {
  try {
    const { folder } = req.body;
    const { folderId } = req.params;

    if (fs.existsSync(path.join(DOWNLOAD_PATH, folder))) {
      throw new Error(
        `Folder ${path.join(DOWNLOAD_PATH, folder)} already exists.`
      );
    }

    const originalFolder = await prisma.folder.findUnique({
      where: {
        id: parseInt(folderId),
      },
    });
    const createdFolder = await prisma.folder.update({
      where: {
        id: parseInt(folderId),
      },
      data: {
        name: folder,
      },
    });

    fs.renameSync(
      path.join(DOWNLOAD_PATH, originalFolder.name),
      path.join(DOWNLOAD_PATH, folder)
    );
    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  newFolderGet,
  newFolderPost,
  folderGet,
  folderDeleteGet,
  editFolderGet,
  editFolderPost,
};
