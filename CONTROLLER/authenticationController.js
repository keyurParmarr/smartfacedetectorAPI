const { createUser, loginUser } = require("../firebase.utils");
const { createSession } = require("../sessions");

const adminloginController = async (req, res, db) => {
  const { email, password } = req.body;
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
};

const logincontroller = async (req, res, db) => {
  const { email, password } = req.body;
  const isVerified = await loginUser(email, password);
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
    res.json({ message: "USER DOESN'T EXIST", success: false });
  }
};

const signupcontroller = async (req, res, db) => {
  const { username, email, password } = req.body;
  const isVerified = await createUser(email, password);
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
};
module.exports = { logincontroller, signupcontroller, adminloginController };
