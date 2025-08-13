const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const { upload } = require("../lib/multer");
const { isAuthenticated } = require("../lib/authMiddleware");

indexRouter.get("/", indexController.indexGet);
indexRouter.get("/upload", isAuthenticated, indexController.uploadFileGet);
indexRouter.post(
  "/upload",
  isAuthenticated,
  upload.single("file"),
  indexController.uploadFilePost
);

module.exports = indexRouter;
