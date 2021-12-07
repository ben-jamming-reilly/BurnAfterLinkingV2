const cors = require("cors");
const cron = require("node-cron");
const dotenv = require("dotenv");
const express = require("express");
const fs = require("fs");
const path = require("path");

// Set the environment variables
const dotenvResult = dotenv.config();
const { db } = require("./utils/db");

const app = express();

// Utility middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// The API routes
app.use("/api/link", require("./api/link"));
app.use("/api/user", require("./api/user"));
app.use("/api/file", require("./api/file"));

if (process.env.NODE_ENV === "production") {
  //set static file
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// This will check for any links that need to be deleted
cron.schedule("* * * * *", async () => {
  // every minute
  try {
    const links = await db.link.deleteMany({
      where: {
        expireDate: {
          gte: new Date(),
        },
      },
    });
    console.log(`${links.length ? links.length : "0"} records removed from DB`);
  } catch (err) {
    console.log(err);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server started on " + PORT));
