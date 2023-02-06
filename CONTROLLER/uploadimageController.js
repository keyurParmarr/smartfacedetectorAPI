const multer = require("multer");
const path = require("path");
const imagecontroller = require("./imageController");
const fs = require("fs");
const cloudinary = require("../CONFIG/cloudinary.config.js");
const { authorize } = require("../UTILS/sessions");
const file = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "UTILS", "IMAGES"));
  },
  filename: (req, file, cb) => {
    cb(null, `image${req.params.id}.jpg`);
  },
});
const upload = multer({ storage: file });
const uploadimageController = async (req, res, db) => {
  try {
    const token = req.headers.authorization;
    const verifiedUser = await authorize(token);
    if (!verifiedUser) return res.json({ message: "Unauthorized" });
    const resp = await cloudinary.uploader.upload(
      path.join(__dirname, "..", "UTILS", "IMAGES", `image${req.params.id}.jpg`)
    );
    req.body.imgurl = resp.url;
    req.body.id = req.params.id;
    await imagecontroller(req, res, db, false);
    fs.unlink(
      path.join(
        __dirname,
        "..",
        "UTILS",
        "IMAGES",
        `image${req.params.id}.jpg`
      ),
      (err) => {
        if (err) console.log(err);
      }
    );
    const data = await cloudinary.uploader.destroy(resp.public_id);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { uploadimageController, upload };
