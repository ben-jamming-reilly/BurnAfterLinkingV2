const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
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

    return res.json(links);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// Creates a new link
router.post("/", auth, async (req, res) => {
  const { passHash, desc, expireDate } = req.body;
  const id = req.user.id;

  if (!passHash || !expireDate) {
    return res
      .status(400)
      .json({ errors: [{ msg: `Incomplete body parameters` }] });
  }

  try {
    const link = await db.link.create({
      data: {
        passHash: passHash,
        userId: id,
        desc: desc,
        expireDate: expireDate,
      },
    });

    // need more logic here

    return res.json(link);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// Update a link
router.put("/", auth, async (req, res) => {
  const { desc, expireDate, passHash } = req.body;
  const id = req.user.id;

  if (!passHash || !expireDate) {
    return res
      .status(400)
      .json({ errors: [{ msg: `Incomplete body parameters` }] });
  }

  try {
    const link = await db.link.update({
      where: {
        userId: id,
        passHash: passHash,
      },
      data: {
        desc: desc,
        expireDate: expireDate,
      },
    });

    return res.json(link);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// Deletes a link
router.delete("/", auth, async (req, res) => {
  const { passHash } = req.body;
  const id = req.user.id;

  if (!passHash) {
    return res
      .status(400)
      .json({ errors: [{ msg: `Incomplete body parameters` }] });
  }

  try {
    const link = await db.link.delete({
      where: {
        passHash: passHash,
        userId: id,
      },
    });
    return res.json(link);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
