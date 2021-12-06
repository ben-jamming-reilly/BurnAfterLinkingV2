const express = require("express");
const path = require("path");
const router = express.Router();

const auth = require("../middleware/auth");
// const captcha = require("../middleware/captcha");
const { db } = require("../utils/db");

router.get("/:passHash", async (req, res) => {
  const passHash = req.params.passHash;
  try {
    const link = await db.link.findUnique({
      where: {
        passHash: passHash,
      },
    });

    if (!link) {
      return res.status(400).json({ errors: [{ msg: `No Link ya dink` }] });
    }

    return res.sendFile(
      path.resolve(__dirname, "..", process.env.UPLOADS_DIR, link.fileName)
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
