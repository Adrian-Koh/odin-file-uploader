const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const path = require("node:path");
const passport = require("passport");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    req.savedPath = "/home/adrian/Documents/Downloads";
    cb(null, req.savedPath);
  },
  filename: function (req, file, cb) {
    const date = new Date();
    req.savedFileName =
      path.parse(file.originalname).name +
      "_" +
      date.toISOString().slice(0, 10) +
      "_" +
      date.toLocaleTimeString([], {
        hourCycle: "h23",
        hour: "2-digit",
        minute: "2-digit",
      }) +
      path.extname(file.originalname);
    cb(null, req.savedFileName);
  },
});
const upload = multer({ storage: storage });
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
