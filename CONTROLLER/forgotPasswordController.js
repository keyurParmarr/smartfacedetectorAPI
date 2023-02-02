const { forgotPassword } = require("../firebase.utils");

const forgotPasswordController = async (req, res, db) => {
  await forgotPassword(req.body.email);

  res.json({
    msg: "PASSWORD RESET LINK HAS BEEN SUCCESSFULLY SENT TO YOUR MAIL",
  });
};
module.exports = forgotPasswordController;
