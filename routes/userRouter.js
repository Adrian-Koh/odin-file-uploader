const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");
const passport = require("passport");

userRouter.get("/login", userController.loginGet);
userRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/upload", // TODO: error page
    successRedirect: "/",
  })
);
userRouter.get("/signup", userController.signupGet);
userRouter.post("/signup", userController.signupPost);
userRouter.get("/logout", userController.logOutGet);

module.exports = userRouter;
