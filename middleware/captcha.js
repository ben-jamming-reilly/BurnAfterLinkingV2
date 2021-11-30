const axios = require("axios");

module.exports = async function (req, res, next) {
  const clientToken = req.header("captcha");

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const captchaRes = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify" +
        `?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${clientToken}`,
      null,
      config
    );

    console.log(captchaRes);

    if (!captchaRes.data.success)
      return res.status(401).json({ msg: "CAPTCHA not verified" });

    next();
  } catch (err) {
    return res.status(401).json({ msg: "CAPTCHA not verified" });
  }
};
