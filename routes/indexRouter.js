const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const path = require("node:path");
const passport = require("passport");
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
indexRouter.get("/new-folder", isAuthenticated, indexController.newFolderGet);
indexRouter.post("/new-folder", isAuthenticated, indexController.newFolderPost);
indexRouter.get("/login", indexController.loginGet);
indexRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/upload", // TODO: error page
    successRedirect: "/",
  })
);
indexRouter.get("/signup", indexController.signupGet);
indexRouter.post("/signup", indexController.signupPost);

module.exports = indexRouter;
