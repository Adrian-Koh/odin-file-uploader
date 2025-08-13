const { Router } = require("express");
const folderRouter = Router();
const folderController = require("../controllers/folderController");
const { isAuthenticated } = require("../lib/authMiddleware");

folderRouter.get("/new", isAuthenticated, folderController.newFolderGet);
folderRouter.post("/new", isAuthenticated, folderController.newFolderPost);
folderRouter.get("/:folderId", isAuthenticated, folderController.folderGet);

module.exports = folderRouter;
