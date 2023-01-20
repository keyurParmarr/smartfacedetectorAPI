const editNameController = async (req, res, db) => {
  const { name, id } = req.body;
  const data = await db("users")
    .update({ name })
    .where("id", "=", id)
    .returning("*");
  res.json(data[0]);
};
module.exports = editNameController;
