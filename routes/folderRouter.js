const { Router } = require("express");
const folderRouter = Router();
const folderController = require("../controllers/folderController");
const { isAuthenticated } = require("../lib/authMiddleware");

folderRouter.get("/new", isAuthenticated, folderController.newFolderGet);
folderRouter.post("/new", isAuthenticated, folderController.newFolderPost);
folderRouter.get("/:folderId", isAuthenticated, folderController.folderGet);
folderRouter.get(
  "/delete/:folderId",
  isAuthenticated,
  folderController.folderDeleteGet
);
folderRouter.get(
  "/edit/:folderId",
  isAuthenticated,
  folderController.editFolderGet
);
folderRouter.post(
  "/edit/:folderId",
  isAuthenticated,
  folderController.editFolderPost
);

module.exports = folderRouter;
