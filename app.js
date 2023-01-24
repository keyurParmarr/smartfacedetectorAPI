const express = require("express");
const app = express();
const knex = require("knex");
const cors = require("cors");
const {
  logincontroller,
  signupcontroller,
  adminloginController,
} = require("./CONTROLLER/authenticationcontroller");
const imagecontroller = require("./CONTROLLER/imageController");
const historycontroller = require("./CONTROLLER/historyController");
const { getUserfromToken } = require("./sessions");
const modifyUsersController = require("./CONTROLLER/modifyUsersController");
const blockUsersController = require("./CONTROLLER/blockUsersController");
const removeUsers = require("./CONTROLLER/removeController");
const signoutUserController = require("./CONTROLLER/signoutUserController");
const editNameController = require("./CONTROLLER/editNameController");
const {
  uploadimageController,
  upload,
} = require("./CONTROLLER/uploadimageController");

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
app.post("/adminlogin", (req, res) => adminloginController(req, res, db));
app.post("/tokenlogin", (req, res) => getUserfromToken(req, res, db));
app.get("/history/:userid", (req, res) => historycontroller(req, res, db));
app.get("/modifyusers", (req, res) => modifyUsersController(req, res, db));
app.post("/blockusers", (req, res) => blockUsersController(req, res, db));
app.get("/removeusers/:id", (req, res) => removeUsers(req, res, db));
app.get("/signout/:id", (req, res) => signoutUserController(req, res, db));
app.post("/editname", (req, res) => editNameController(req, res, db));
app.post("/uploadimage/:id", upload.single("image"), (req, res) =>
  uploadimageController(req, res, db)
);
module.exports = app;
