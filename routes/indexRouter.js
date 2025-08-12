const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

app.get("/", indexController.indexGet);
app.get("/file", indexController.uploadFileGet);

module.exports = indexRouter;
