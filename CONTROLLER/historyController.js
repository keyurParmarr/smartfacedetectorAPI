const historycontroller = async (req, res, db) => {
  try {
    const { userid } = req.params;
    console.log(userid);
    const historyData = await db
      .select("history")
      .from("history")
      .where("id", "=", userid)
      .returning("*");
    console.log(historyData.length);
    res.json({ historyData });
  } catch (error) {
    console.log(error);
  }
};
module.exports = historycontroller;
