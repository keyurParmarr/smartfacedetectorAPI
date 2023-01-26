const Clarifai = require("clarifai");

const faceApp = new Clarifai.App({
  apiKey: "26bcbf5eb0cb4f7695c5dcc8c8ed56a6",
});
const imagecontroller = async (req, res, db, flag) => {
  try {
    const { imgurl, id } = req.body;
    const data = await faceApp.models.predict(Clarifai.CELEBRITY_MODEL, imgurl);

    if (data && data.outputs[0].data.regions) {
      const userData = await db("users")
        .increment("entries", 1)
        .where("id", "=", id)
        .returning("*");
      res.json({ data, userData });
      if (flag) await db.insert({ history: imgurl, id }).into("history");

      return;
    }
    if (!data.outputs[0].data.regions) {
      return res.json({ message: "This image does not contain any faces" });
    }
  } catch (error) {
    console.log(error.message, "26");
    if (error.code === "23505") return;
    return res.json({ message: "INVALID URL" });
  }
};
module.exports = imagecontroller;
