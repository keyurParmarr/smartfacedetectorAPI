const express = require("express");
const app = express();
const knex = require("knex");
const cors = require("cors");
const path = require("path");
const {
  logincontroller,
  signupcontroller,
  adminloginController,
} = require("./CONTROLLER/authenticationController");
const imagecontroller = require("./CONTROLLER/imageController");
const historycontroller = require("./CONTROLLER/historyController");
const modifyUsersController = require("./CONTROLLER/modifyUsersController");
const blockUsersController = require("./CONTROLLER/blockUsersController");
const removeUsers = require("./CONTROLLER/removeController");
const signoutUserController = require("./CONTROLLER/signoutUserController");
const editNameController = require("./CONTROLLER/editNameController");
const {
  uploadimageController,
  upload,
} = require("./CONTROLLER/uploadimageController");
const forgotPasswordController = require("./CONTROLLER/forgotPasswordController");
const { getUserfromToken } = require("./UTILS/sessions");
const deleteHistory = require("./CONTROLLER/deletehistoryController");
const deleteallHistory = require("./CONTROLLER/deleteallHistory");
const deletespecific = require("./CONTROLLER/deleteSpecific");

app.use(cors());
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "UTILS", "TEMPLATE"));

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "1674",
    database: "postgres",
  },
});

app.post("/login", (req, res) => logincontroller(req, res, db));
app.post("/signup", (req, res) => signupcontroller(req, res, db));
app.post("/imagebox", (req, res) => imagecontroller(req, res, db, true));
app.post("/adminlogin", (req, res) => adminloginController(req, res, db));
app.post("/tokenlogin", (req, res) => getUserfromToken(req, res, db));
app.get("/history/:userid", (req, res) => historycontroller(req, res, db));
app.get("/modifyusers", (req, res) => modifyUsersController(req, res, db));
app.post("/blockusers", (req, res) => blockUsersController(req, res, db));
app.get("/removeusers/:id", (req, res) => removeUsers(req, res, db));
app.post("/signout", (req, res) => signoutUserController(req, res, db));
app.post("/editname", (req, res) => editNameController(req, res, db));
app.post("/deleteallHistory", (req, res) => deleteallHistory(req, res, db));
app.post("/forgotpassword", (req, res) =>
  forgotPasswordController(req, res, db)
);
app.post("/uploadimage/:id", upload.single("image"), (req, res) =>
  uploadimageController(req, res, db)
);
app.post("/deletehistory", (req, res) => deleteHistory(req, res, db));
app.post("/deletespecific", (req, res) => deletespecific(req, res, db));
module.exports = app;
