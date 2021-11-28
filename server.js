const dotenv = require("dotenv");
const express = require("express");

// Set the environment variables
const dotenvResult = dotenv.config();

const app = express();

// Utility middleware
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  //set static file
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server started on " + PORT));
