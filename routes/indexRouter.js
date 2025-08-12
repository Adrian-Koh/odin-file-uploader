const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.indexGet);
indexRouter.get("/upload", indexController.uploadFileGet);

module.exports = indexRouter;
