const blockUsersController = async (req, res, db) => {
  const id = req.params.id;
  console.log(id, "3");
  const user = await db("users")
    .update({ isblocked: true })
    .where("id", "=", id)
    .returning("*");
  console.log(user);
};

module.exports = blockUsersController;
