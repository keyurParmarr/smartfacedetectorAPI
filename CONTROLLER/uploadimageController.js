const multer = require("multer");
const path = require("path");
const imagecontroller = require("./imageController");
const fs = require("fs");
const cloudinary = require("../CONFIG/cloudinary.config.js");
const file = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "UTILS", "IMAGES"));
  },
  filename: (req, file, cb) => {
    console.log(req.params);
    cb(null, `image${req.params.id}.jpg`);
  },
});
const upload = multer({ storage: file });
const uploadimageController = async (req, res, db) => {
  const resp = await cloudinary.uploader.upload(
    path.join(__dirname, "..", "UTILS", "IMAGES", `image${req.params.id}.jpg`)
  );
  req.body.imgurl = resp.url;
  req.body.id = req.params.id;
  await imagecontroller(req, res, db);
  fs.unlink(
    path.join(__dirname, "..", "UTILS", "IMAGES", `image${req.params.id}.jpg`),
    (err) => {
      if (err) console.log(err);
    }
  );
  const data = await cloudinary.uploader.destroy(resp.public_id);
};

module.exports = { uploadimageController, upload };
