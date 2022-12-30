const express = require("express");
const app = express();
const knex = require("knex");
const cors = require("cors");
const {
  logincontroller,
  signupcontroller,
} = require("./CONTROLLER/authenticationcontroller");
const imagecontroller = require("./CONTROLLER/imageController");
const historycontroller = require("./CONTROLLER/historyController");
app.use(cors());
app.use(express.json());
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "1674",
    database: "postgres",
  },
});

app.get("/", (req, res) => {
  res.send("<h1>hello</h1>");
});

app.post("/login", (req, res) => logincontroller(req, res, db));
app.post("/signup", (req, res) => signupcontroller(req, res, db));
app.post("/imagebox", (req, res) => imagecontroller(req, res, db));
app.get("/history/:userid", (req, res) => historycontroller(req, res, db));
module.exports = app;
