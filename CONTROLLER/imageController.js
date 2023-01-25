const Clarifai = require("clarifai");

const faceApp = new Clarifai.App({
  apiKey: "26bcbf5eb0cb4f7695c5dcc8c8ed56a6",
});
const imagecontroller = async (req, res, db) => {
  try {
    const { imgurl, id } = req.body;
    console.log(imgurl, id, "8");
    const data = await faceApp.models.predict(Clarifai.CELEBRITY_MODEL, imgurl);

    if (data && data.outputs[0].data.regions) {
      await db.insert({ history: imgurl, id }).into("history");
      const userData = await db("users")
        .increment("entries", 1)
        .where("id", "=", id)
        .returning("*");
      res.json({ data, userData });

      return;
    }
    if (!data.outputs[0].data.regions) {
      return res.json({ message: "This image does not contain any faces" });
    }
  } catch (error) {
    console.log(error.message, "26");
    return res.json({ message: "INVALID URL" });
  }
};
module.exports = imagecontroller;
