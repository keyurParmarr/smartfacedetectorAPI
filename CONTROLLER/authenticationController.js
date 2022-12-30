const { createUser, loginUser } = require("../firebase.utils");

const logincontroller = async (req, res, db) => {
  const { email, password } = req.body;
  const isVerified = await loginUser(email, password);
  if (isVerified) {
    const user = await db
      .select("*")
      .from("users")
      .where("email", "=", email)
      .returning("*");
    res.json({ ...user[0], success: true });
  } else {
    res.json({ success: false });
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
    res.json({ ...user[0], success: true });
  } else {
    res.json({ success: false });
  }
};
module.exports = { logincontroller, signupcontroller };
