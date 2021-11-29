const dotenv = require("dotenv");
const express = require("express");
const fs = require("fs");
const path = require("path");

// Set the environment variables
const dotenvResult = dotenv.config();

const app = express();

// Utility middleware
app.use(express.json());

// The API routes
app.use("/api/link", require("./api/link"));
app.use("/api/user", require("./api/user"));

if (process.env.NODE_ENV === "production") {
  //set static file
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Creates an uploads folder if it doesn't exists
if (!fs.existsSync(path.resolve(__dirname, process.env.UPLOADS_DIR))) {
  fs.mkdirSync(path.resolve(__dirname, process.env.UPLOADS_DIR), {
    recursive: true,
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server started on " + PORT));
