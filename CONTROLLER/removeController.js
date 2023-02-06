const removeUsers = async (req, res, db) => {
  const id = req.params.id;
  try {
    await db("users").delete().where("id", "=", id).returning("*");
    const allUsersTableData = await db("users");
    res.json(allUsersTableData);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = removeUsers;
