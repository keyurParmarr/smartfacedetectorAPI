const express = require("express");
const app = express();
const cors = require("cors");
const knex = require("knex");
const { auth, createUser, signinUser } = require("./firebase.utils");

app.use(cors());

app.use(express.json());
const db = knex();
app.get("/", async (req, res) => {
  const data = await db.select("*").from("users");
  console.log(data);
});
app.post("/login", (req, res) => {
  signinUser(auth, req.body.email, req.body.password, req, res);
});

app.post("/signup", (req, res) => {
  console.log(req.body);
  createUser(auth, req.body.email, req.body.password, req, res);
});
app.post("/imagebox", async (req, res) => {
  const { imgurl, height, width } = req.body;

  const data = await faceApp.models.predict(Clarifai.FACE_DETECT_MODEL, imgurl);

  if (data && data.outputs[0].data.regions) {
    const boxData = data.outputs[0].data.regions.map((i) => {
      const clarfaiim = i.region_info.bounding_box;
      const w = Number(width);
      const h = Number(height);

      return {
        leftCol: clarfaiim.left_col * w,
        rightCol: w - clarfaiim.right_col * w,
        topRow: clarfaiim.top_row * h,
        bottomRow: h - clarfaiim.bottom_row * h,
      };
    });
    res.json({ boxData });
  }
});
app.listen(5000, () => {
  console.log("server running");
});
