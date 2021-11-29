const multer = require("multer");
const fs = require("fs");

const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const parts = file.mimetype.split("/");
    const filename = file.fieldname;
    cb(null, filename);
  },
});

const uploads = multer({
  storage: storageEngine,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

module.exports = uploads;
