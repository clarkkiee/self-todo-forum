const express = require("express");
const router = express.Router();
const prisma = require("../db");
const { login } = require("./login.service");
const jwt = require("jsonwebtoken");
const Swal = require("sweetalert2");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

const JWT_SECRET = process.env.JWT_SECRET;
const tokenExpires = process.env.JWT_TOKEN_EXPIRES;

router.post("/login", isLoggedIn, async (req, res) => {
  const findUser = await prisma.user.findFirst({
    where: {
      username: req.body.username,
    },
  });

  if (!findUser) {
    return res.status(404).send("User not found");
  }

  const isValidUserLogin = await login(req.body);

  if (!isValidUserLogin) {
    return res.status(401).send("Username or password incorrect");
  }

  const jwtPayload = {
    id: findUser.id,
    username: findUser.username,
    fullname: findUser.fullname,
  };

  const accessToken = jwt.sign(jwtPayload, JWT_SECRET, {
    expiresIn: tokenExpires,
  });

  return res
    .cookie("access_token", accessToken, {
      domain: "http://localhost:3000",
      secure: true,
      sameSite: "none",
    })
    .send({
      payload: {
        id: findUser.id,
        username: findUser.username,
        fullname: findUser.fullname,
      },
      message: "Login successful",
      token: accessToken,
    });
});

module.exports = router;
