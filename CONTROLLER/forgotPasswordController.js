const { forgotPassword } = require("../UTILS/firebase.utils");

const forgotPasswordController = async (req, res, db) => {
  try {
    await forgotPassword(req.body.email);
    res.json({
      msg: "PASSWORD RESET LINK HAS BEEN SUCCESSFULLY SENT TO YOUR MAIL",
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = forgotPasswordController;
