const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");
const { upload } = require("../lib/multer");
const { isAuthenticated } = require("../lib/authMiddleware");

fileRouter.get("/upload", isAuthenticated, fileController.uploadFileGet);
fileRouter.post(
  "/upload",
  isAuthenticated,
  upload.single("file"),
  fileController.uploadFilePost
);

module.exports = fileRouter;
