const multer = require("multer");
const path = require("node:path");
const DOWNLOAD_PATH = path.join(__dirname, "tmp");
console.log(DOWNLOAD_PATH);

const fs = require("node:fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(DOWNLOAD_PATH)) {
      fs.mkdirSync(DOWNLOAD_PATH);
    }
    req.savedPath = DOWNLOAD_PATH;

    cb(null, req.savedPath);
  },
  filename: function (req, file, cb) {
    req.savedFileName =
      path.parse(file.originalname).name + path.extname(file.originalname);
    cb(null, req.savedFileName);
  },
});
const upload = multer({ storage: storage });

module.exports = { DOWNLOAD_PATH, upload };
