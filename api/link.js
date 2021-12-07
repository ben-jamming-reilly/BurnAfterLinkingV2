const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const { db } = require("../utils/db");

// Get all of the links
router.get("/", auth, async (req, res) => {
  const id = req.user.id;

  try {
    const links = await db.link.findMany({
      where: {
        userId: id,
      },
      select: {
        passHash: true,
        userId: true,
        desc: true,
        expireDate: true,
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
  const { passHash, desc, expireDate, data } = req.body;
  const id = req.user.id;

  if (!passHash || !expireDate) {
    return res
      .status(400)
      .json({ errors: [{ msg: `Incomplete body parameters` }] });
  }

  try {
    let link = await db.link.create({
      data: {
        passHash: passHash,
        userId: id,
        desc: desc,
        expireDate: new Date(expireDate),
        data: data,
      },
    });

    link.data = undefined;

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
    let link = await db.link.findFirst({
      where: {
        userId: id,
        passHash: passHash,
      },
    });

    if (!link) {
      return res.status(400).json({ errors: [{ msg: `Link doesn't exist` }] });
    }

    link = await db.link.update({
      where: {
        passHash: passHash,
      },
      data: {
        desc: desc,
        expireDate: new Date(expireDate),
      },
    });

    return res.json(link);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// Deletes a link
router.delete("/:passHash", auth, async (req, res) => {
  const passHash = req.params.passHash;
  const id = req.user.id;

  if (!passHash) {
    return res
      .status(400)
      .json({ errors: [{ msg: `Incomplete body parameters` }] });
  }

  try {
    let link = await db.link.findFirst({
      where: {
        userId: id,
        passHash: passHash,
      },
    });

    if (!link) {
      return res.status(400).json({ errors: [{ msg: `Link doesn't exist` }] });
    }

    link = await db.link.delete({
      where: {
        passHash: passHash,
      },
    });
    return res.json(link);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
