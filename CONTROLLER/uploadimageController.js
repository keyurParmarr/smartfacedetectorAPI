const multer = require("multer");
const path = require("path");
const imagecontroller = require("./imageController");
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
const uploadimageController = (req, res, db) => {
  cloudinary.uploader.upload(
    path.join(__dirname, "..", "UTILS", "IMAGES", `image${req.params.id}.jpg`),
    (err, resp) => {
      req.body.imgurl = resp.url;
      req.body.id = req.params.id;
      imagecontroller(req, res, db);
    }
  );
};

module.exports = { uploadimageController, upload };
