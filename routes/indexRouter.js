const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const { getLinks } = require("../lib/navLinks");

indexRouter.get("/", getLinks, indexController.indexGet);
indexRouter.get("/failed-auth", getLinks, indexController.failedAuthGet);

module.exports = indexRouter;
