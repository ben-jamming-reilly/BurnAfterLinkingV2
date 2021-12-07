const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "..", process.env.UPLOADS_DIR));
  },
  filename: (req, file, cb) => {
    const parts = file.mimetype.split("/");
    const filename = `${uuidv4()}.${parts[1]}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storageEngine,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

module.exports = upload;
