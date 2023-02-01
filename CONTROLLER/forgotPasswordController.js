const { forgotPassword } = require("../firebase.utils");

const forgotPasswordController = async (req, res, db) => {
  await forgotPassword(req.body.email);
};
module.exports = forgotPasswordController;
