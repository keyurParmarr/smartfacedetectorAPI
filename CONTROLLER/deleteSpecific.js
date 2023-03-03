const deletespecific = async (req, res, db) => {
  const arr = req.body.selectedLinks;
  const id = req.body.id;
  try {
    for (let i = 0; i < arr.length; i++) {
      await db("history").delete().where("history", "=", arr[i]);
    }
    const history = await db("history").where("id", "=", id).returning("*");
    res.json(history);
  } catch (error) {
    console.log(error);
  }
};
module.exports = deletespecific;
