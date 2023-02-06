const editNameController = async (req, res, db) => {
  const { name, id } = req.body;
  try {
    const data = await db("users")
      .update({ name })
      .where("id", "=", id)
      .returning("*");
    res.json(data[0]);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = editNameController;
