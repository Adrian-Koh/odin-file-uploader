const multer = require("multer");
const DOWNLOAD_PATH = "/home/adrian/Documents/Downloads";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    req.savedPath = DOWNLOAD_PATH;
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

module.exports = { DOWNLOAD_PATH, upload };
