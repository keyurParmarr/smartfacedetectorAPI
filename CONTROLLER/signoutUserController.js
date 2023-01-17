const { deleteSession } = require("../sessions");

const signoutUserController = async (req, res, db) => {
  deleteSession(req, res, db);
};
module.exports = signoutUserController;
