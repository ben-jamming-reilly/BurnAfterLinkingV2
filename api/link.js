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
    });

    return res.json(links);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// Creates a new link
router.post("/", [auth, upload.single("file")], async (req, res) => {
  const { passHash, desc, expireDate } = JSON.parse(req.body.data);
  const id = req.user.id;
  // const filename = `${req.file.filename}.${req.file.mimetype.split("/")[1]}`;
  const filename = req.file.filename;

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
        fileName: filename,
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
