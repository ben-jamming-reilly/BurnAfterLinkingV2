const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const { db } = require("../utils/db");
const auth = require("../middleware/auth");
const { isValidEmail } = require("../utils/helpers");

// Gets back the user data
router.get("/", auth, async (req, res) => {
  const id = req.user.id;
  try {
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        createDate: true,
      },
    });

    return res.json(user);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error :(");
  }
});

// Creates a User
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ errors: [{ msg: `Incomplete body parameters` }] });
  }

  if (!isValidEmail(email)) {
    return res
      .status(400)
      .json({ errors: [{ msg: `Email must be a valid address` }] });
  }

  try {
    let user = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      return res.status(400).json({ errors: [{ msg: `User already exists` }] });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    user = await db.user.create({
      data: {
        email: email,
        password: hashPassword,
      },
    });

    // Sends the jwt for auth

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: Number(process.env.JWT_TTL) },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error :(");
  }
});

// Login a User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ errors: [{ msg: `Incomplete body parameters` }] });
  }

  try {
    const user = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: `Invalid Credentials` }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: `Invalid Credentials` }] });
    }

    // Sends the jwt for auth
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: Number(process.env.JWT_TTL) },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error :(");
  }
});

// deletes the user
router.delete("/", auth, async (req, res) => {
  const id = req.user.id;
  try {
    await db.link.deleteMany({
      where: {
        userId: id,
      },
    });

    await db.user.delete({
      where: {
        id: id,
      },
    });

    return res.send("Ok");
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error :(");
  }
});

module.exports = router;
