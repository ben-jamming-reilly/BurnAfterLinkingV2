const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const { db } = require("../utils/db");

// Get all of the links
router.get("/", auth, async (req, res) => {
  const id = req.user.id;

  try {
    const links = await db.link.findMany({
      where: {
        userId: id,
      },
    });

    return links;
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// Creates a new link
router.post("/", auth, async (req, res) => {
  const id = req.user.id;

  try {
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// Update a link
router.put("/", auth, async (req, res) => {
  const id = req.user.id;

  try {
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// Deletes a link
router.delete("/", auth, async (req, res) => {
  const id = req.user.id;

  try {
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
