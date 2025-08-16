const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");
const { upload } = require("../lib/multer");
const { isAuthenticated } = require("../lib/authMiddleware");
const { getLinks } = require("../lib/navLinks");

fileRouter.get(
  "/upload",
  isAuthenticated,
  getLinks,
  fileController.uploadFileGet
);
fileRouter.post(
  "/upload",
  isAuthenticated,
  upload.single("file"),
  fileController.uploadFilePost
);
fileRouter.get(
  "/:fileId",
  isAuthenticated,
  getLinks,
  fileController.fileDetailsGet
);
fileRouter.get(
  "/download/:fileId",
  isAuthenticated,
  fileController.fileDownloadGet
);
fileRouter.get(
  "/delete/:fileId",
  isAuthenticated,
  fileController.fileDeleteGet
);

module.exports = fileRouter;
