const modifyUsersController = async (req, res, db) => {
  try {
    const users = await db("users");
    res.json({ modifyusers: users });
    return;
  } catch (error) {
    console.log(error);
  }
};

module.exports = modifyUsersController;
