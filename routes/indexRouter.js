const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.indexGet);
indexRouter.get("/upload", indexController.uploadFileGet);
indexRouter.get("/login", indexController.loginGet);
indexRouter.get("/signup", indexController.signupGet);

module.exports = indexRouter;
