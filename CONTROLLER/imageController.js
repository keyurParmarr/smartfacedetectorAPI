const Clarifai = require("clarifai");
const faceApp = new Clarifai.App({
  apiKey: "e2b08b3cdc70408d910e58f2051a8a3d",
});
const imagecontroller = async (req, res, db) => {
  try {
    const { imgurl, id } = req.body;
    console.log(imgurl, id, "8");
    const data = await faceApp.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      imgurl
    );
    console.log(data, "13");
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
    console.log(error.message);
  }
};
module.exports = imagecontroller;
