const deleteHistory = async (req, res, db) => {
  const { id, deletelink } = req.body;
  try {
    const data = await db("history")
      .delete()
      .where("history", "=", deletelink)
      .returning("*");
    const tabledata = await db("history").where("id", "=", id).returning("*");
    res.json(tabledata);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = deleteHistory;
