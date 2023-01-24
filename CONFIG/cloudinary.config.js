const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dsdzlqpdx",
  api_key: "661132465438635",
  api_secret: "OyNs2w2wuL9KRYnxAlyi364ImXo",
});
// console.log(typeof );
// cloudinary.uploader.upload("../UTILS/IMAGES/image.jpg", (err, res) => {
//   console.log(res.url);
// });
module.exports = cloudinary;
