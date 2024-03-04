const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();
const port = process.env.PORT;

const registerController = require("./register/register.controller");
const loginController = require("./login/login.controller");
const dashboardController = require("./dashboard/dashboard.controller");
const communitiesController = require("./communities/communities.controller");

app.use(express.json());
app.use(
  cors({
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    origin: "http://localhost:3000",
    exposedHeaders: ["set-cookie"],
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("WELCOME TO THE API");
});

app.use("/api", loginController);
app.use("/api", registerController);
app.use("/api", dashboardController);
app.use("/api/communities", communitiesController);

app.listen(port, () => {
  console.log("server listening on port ", port);
});
