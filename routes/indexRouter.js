const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const passport = require("passport");

indexRouter.get("/", indexController.indexGet);
indexRouter.get("/upload", indexController.uploadFileGet);
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
