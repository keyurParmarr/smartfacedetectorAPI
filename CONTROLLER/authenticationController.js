const { createUser, loginUser } = require("../firebase.utils");
const { createSession } = require("../sessions");

const logincontroller = async (req, res, db) => {
  const { email, password } = req.body;
  const isVerified = await loginUser(email, password);
  console.log(isVerified);
  if (isVerified) {
    const user = await db
      .select("*")
      .from("users")
      .where("email", "=", email)
      .returning("*");
    console.log(user);
    const session = await createSession(user[0]);
    console.log(session);
    res.json({ ...session, success: true });
  } else {
    res.json({ success: false });
  }
};

const signupcontroller = async (req, res, db) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
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
    res.json({ success: false });
  }
};
module.exports = { logincontroller, signupcontroller };
