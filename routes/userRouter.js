const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");
const passport = require("passport");
const { getLinks } = require("../lib/navLinks");

userRouter.get("/login", getLinks, userController.loginGet);
userRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/failed-auth",
    successRedirect: "/",
  })
);
userRouter.get("/signup", getLinks, userController.signupGet);
userRouter.post("/signup", userController.signupPost);
userRouter.get("/logout", userController.logOutGet);

module.exports = userRouter;
