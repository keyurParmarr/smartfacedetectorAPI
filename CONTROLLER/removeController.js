const removeUsers = async (req, res, db) => {
  const id = req.params.id;
  const user = await db("users").delete().where("id", "=", id).returning("*");
  const allUsersTableData = await db("users");
  res.json(allUsersTableData);
  console.log(allUsersTableData);
};
module.exports = removeUsers;
