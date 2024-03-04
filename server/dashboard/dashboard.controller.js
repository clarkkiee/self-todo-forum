const express = require("express");
const prisma = require("../db");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.use(isAuthenticated)

router.get("/dashboard", async (req, res) => {
  const token = req.cookies.access_token;
  const jwtDecode = jwt.decode(token, process.env.JWT_SECRET);
  const userLoginData = {
    username: jwtDecode.username,
    fullname: jwtDecode.fullname,
  };
  res.send(userLoginData);
});

module.exports = router;
