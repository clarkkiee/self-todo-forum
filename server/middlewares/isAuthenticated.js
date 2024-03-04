const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    return res.status(401).send("Token is required")
  }

  const secret = process.env.JWT_SECRET;

  try {
    const jtwDecode = jwt.verify(accessToken, secret);
    req.userData = jtwDecode;
    next();
  } catch (error) {
    return res.status(401).send({
      message: "Unauthorized",
      error: error.message,
    });
  }
};

module.exports = isAuthenticated;
