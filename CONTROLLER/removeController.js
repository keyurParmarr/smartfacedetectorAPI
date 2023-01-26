const removeUsers = async (req, res, db) => {
  const id = req.params.id;
  await db("users").delete().where("id", "=", id).returning("*");
  const allUsersTableData = await db("users");
  res.json(allUsersTableData);
};
module.exports = removeUsers;
