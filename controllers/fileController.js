const path = require("node:path");
const { getLinks } = require("../lib/navLinks");
const fs = require("node:fs");
const { DOWNLOAD_PATH } = require("../lib/multer");
const { prisma } = require("../lib/prisma");
const { uploadFile } = require("../lib/supabase");

async function uploadFileGet(req, res, next) {
  try {
    const folders = await prisma.folder.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.render("formContainer", {
      title: "Upload file",
      formName: "upload",
      folders,
      links: getLinks(req.isAuthenticated()),
    });
  } catch (err) {
    next(err);
  }
}

async function uploadFilePost(req, res, next) {
  try {
    let savedFilePath = path.join(req.savedPath, req.savedFileName);
    let folderName = null;

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
      folderName = folder.name;
    }

    const stats = fs.statSync(savedFilePath);
    const fileSizeInBytes = stats.size;

    const fileContent = fs.readFileSync(savedFilePath);

    const fileUrl = await uploadFile(
      req.savedFileName,
      fileContent,
      folderName
    );

    const file = await prisma.file.create({
      data: {
        userId: req.user.id,
        name: req.savedFileName,
        uploadTime: new Date(),
        fileSize: fileSizeInBytes,
        folderId:
          req.body.folder === "novalue" ? null : parseInt(req.body.folder),
        url: fileUrl,
      },
    });

    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

async function fileDetailsGet(req, res, next) {
  try {
    const { fileId } = req.params;
    const file = await prisma.file.findUnique({
      where: {
        id: parseInt(fileId),
      },
    });

    let fileSizeString;

    if (file.fileSize / 1024 < 1) {
      fileSizeString = file.fileSize + "B";
    } else if (file.fileSize / Math.pow(1024, 2) < 1) {
      fileSizeString = Math.round((file.fileSize / 1024) * 100) / 100 + "KB";
    } else if (file.fileSize / Math.pow(1024, 3) < 1) {
      fileSizeString =
        Math.round((file.fileSize / Math.pow(1024, 2)) * 100) / 100 + "MB";
    } else {
      fileSizeString =
        Math.round((file.fileSize / Math.pow(1024, 3)) * 100) / 100 + "GB";
    }
    res.render("fileDetails", {
      links: getLinks(req.isAuthenticated()),
      file: { ...file, fileSizeString },
    });
  } catch (err) {
    next(err);
  }
}

async function fileDownloadGet(req, res, next) {
  const { fileId } = req.params;
  const file = await prisma.file.findUnique({
    where: {
      id: parseInt(fileId),
    },
  });
  const filePathOnDisk = await getFilePathOnDisk(prisma, file);
  res.download(filePathOnDisk, (err) => {
    if (err) {
      next(err);
    }
  });
}

async function fileDeleteGet(req, res, next) {
  const { fileId } = req.params;
  const file = await prisma.file.delete({
    where: {
      id: parseInt(fileId),
    },
  });
  const filePathOnDisk = await getFilePathOnDisk(prisma, file);
  fs.unlinkSync(filePathOnDisk);
  res.redirect("/");
}

async function getFilePathOnDisk(prisma, file) {
  if (file.folderId) {
    const folder = await prisma.folder.findUnique({
      where: {
        id: parseInt(file.folderId),
      },
    });
    return path.join(DOWNLOAD_PATH, folder.name, file.name);
  } else {
    return path.join(DOWNLOAD_PATH, file.name);
  }
}

module.exports = {
  uploadFileGet,
  uploadFilePost,
  fileDetailsGet,
  fileDownloadGet,
  fileDeleteGet,
};
