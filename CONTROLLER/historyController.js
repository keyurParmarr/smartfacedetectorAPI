const historycontroller = async (req, res, db) => {
  try {
    const { userid } = req.params;
    const historyData = await db
      .select("history")
      .from("history")
      .where("id", "=", userid)
      .returning("*");
    res.json({ historyData });
  } catch (error) {
    console.log(error);
  }
};
module.exports = historycontroller;
