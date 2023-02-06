const { loginUser, createUser } = require("../UTILS/firebase.utils");
const { createSession } = require("../UTILS/sessions");

const adminloginController = async (req, res, db) => {
  const { email, password } = req.body;
  try {
    const isVerified = await loginUser(email, password);
    if (isVerified) {
      const user = await db
        .select("*")
        .from("users")
        .where("email", "=", email)
        .returning("*");
      if (user[0].isadmin) {
        const session = await createSession(user[0]);
        res.json({ ...session, success: true });
        return;
      } else {
        res.json({ message: "YOU ARE NOT AN ADMIN", success: false });
      }
    } else {
      res.json({ message: "WRONG CREDENTIALS", success: false });
    }
  } catch (error) {
    res.json({ message: "SOMETHING WENT WRONG", success: false });
    console.log(error.message);
  }
};

const logincontroller = async (req, res, db) => {
  const { email, password } = req.body;
  const isVerified = await loginUser(email, password);
  try {
    if (isVerified) {
      const user = await db
        .select("*")
        .from("users")
        .where("email", "=", email)
        .returning("*");
      if (user[0].isblocked) {
        return res.json({
          message: "YOU ARE BLOCKED FROM THIS WEBSITE",
          success: false,
        });
      }
      const session = await createSession(user[0]);
      res.json({ ...session, success: true });
    } else {
      res.json({ message: "WRONG CREDENTIALS", success: false });
    }
  } catch (error) {
    res.json({ message: "SOMETHING WENT WRONG", success: false });
    console.log(error.message);
  }
};

const signupcontroller = async (req, res, db) => {
  const { username, email, password } = req.body;
  try {
    const isVerified = await createUser(email, password, username);
    if (isVerified) {
      const user = await db
        .insert({
          name: username,
          email: email,
          entries: 0,
          joined: new Date(),
        })
        .into("users")
        .returning("*");
      const session = await createSession(user[0]);
      res.json({ ...session, success: true });
    } else {
      res.json({ success: false, message: "USER ALREADY EXISTS" });
    }
  } catch (error) {
    res.json({ message: "SOMETHING WENT WRONG", success: false });
    console.log(error.message);
  }
};
module.exports = { logincontroller, signupcontroller, adminloginController };
