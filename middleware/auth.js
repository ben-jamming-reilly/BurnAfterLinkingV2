const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  // Get token from header
  const token = req.header("Authorization");

  // Reject if no token
  if (!token)
    return res
      .status(401)
      .json({ errors: [{ msg: "No token, authorization denied" }] });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ errors: [{ msg: "Invalid Token" }] });
  }
};
