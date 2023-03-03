const deleteallHistory = async (req, res, db) => {
  const { id } = req.body;
  try {
    const data = await db("history").delete().where("id", "=", id);
    const tabledata = await db("history").where("id", "=", id).returning("*");
    res.json(tabledata);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = deleteallHistory;
