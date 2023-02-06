const blockUsersController = async (req, res, db) => {
  const { id, request } = req.body;
  try {
    const user = await db("users")
      .update({ isblocked: request === "block" ? true : false })
      .where("id", "=", id)
      .returning("*");
    const alluserTabledata = await db("users");
    res.json(alluserTabledata);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = blockUsersController;
