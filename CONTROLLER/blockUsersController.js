const blockUsersController = async (req, res, db) => {
  const { id, request } = req.body;
  console.log(id, request);
  const user = await db("users")
    .update({ isblocked: request === "block" ? true : false })
    .where("id", "=", id)
    .returning("*");
  console.log(user);

  const alluserTabledata = await db("users");
  res.json(alluserTabledata);
};

module.exports = blockUsersController;
