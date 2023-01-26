const multer = require("multer");
const file = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "UTILS", "IMAGES"));
  },
  filename: (req, file, cb) => {
    cb(null, `image${req.params.id}.jpg`);
  },
});
const upload = multer({ storage: file });
const profileimageController = async (req, res, db) => {};
module.exports = profileimageController;
