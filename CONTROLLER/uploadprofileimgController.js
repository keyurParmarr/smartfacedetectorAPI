const uploadprofileimgController = async (req, res, db) => {
  const { id } = req.params;
  try {
    const data = await db("users")
      .update({ avatarurl: `http://localhost:5000/profilepic${id}.jpg` })
      .where("id", "=", id)
      .returning("*");
    res.json(data[0]);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = uploadprofileimgController;
