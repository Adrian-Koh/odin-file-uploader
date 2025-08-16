const { Router } = require("express");
const folderRouter = Router();
const folderController = require("../controllers/folderController");
const { isAuthenticated } = require("../lib/authMiddleware");
const { getLinks } = require("../lib/navLinks");

folderRouter.get(
  "/new",
  isAuthenticated,
  getLinks,
  folderController.newFolderGet
);
folderRouter.post("/new", isAuthenticated, folderController.newFolderPost);
folderRouter.get(
  "/:folderId",
  isAuthenticated,
  getLinks,
  folderController.folderGet
);
folderRouter.get(
  "/delete/:folderId",
  isAuthenticated,
  folderController.folderDeleteGet
);
folderRouter.get(
  "/edit/:folderId",
  isAuthenticated,
  getLinks,
  folderController.editFolderGet
);
folderRouter.post(
  "/edit/:folderId",
  isAuthenticated,
  folderController.editFolderPost
);

module.exports = folderRouter;
