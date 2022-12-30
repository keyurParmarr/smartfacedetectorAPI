const Clarifai = require("clarifai");
const faceApp = new Clarifai.App({
  apiKey: "26bcbf5eb0cb4f7695c5dcc8c8ed56a6",
});
const imagecontroller = async (req, res, db) => {
  try {
    const { imgurl, id } = req.body;
    const data = await faceApp.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      imgurl
    );
    if (data && data.outputs[0].data.regions) {
      //insert imgurl into history table after succesful after detection
      await db.insert({ history: imgurl, id }).into("history");
      const userData = await db("users")
        .increment("entries", 1)
        .where("id", "=", id)
        .returning("*");
      res.json({ data, userData });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = imagecontroller;
