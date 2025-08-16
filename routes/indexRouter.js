const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.indexGet);
indexRouter.get("/failed-auth", indexController.failedAuthGet);

module.exports = indexRouter;
