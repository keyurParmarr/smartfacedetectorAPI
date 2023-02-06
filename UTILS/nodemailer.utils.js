const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const { handlebars } = require("hbs");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "parmarkeyur1104@gmail.com",
    pass: "pdrkbvhhrlfcawoh",
  },
});
const sendMail = (email, username) => {
  const data = fs
    .readFileSync(path.join(__dirname, "TEMPLATE", "email.hbs"))
    .toString();
  const emailTemplate = handlebars.compile(data);
  const finalEmail = emailTemplate({ username, email });
  const mailOptions = {
    from: "parmarkeyur1104@gmail.com",
    to: `${email}`,
    subject: "WELCOME TO SMART FACE DETECTOR",
    html: finalEmail,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    console.log(err);
  });
};
module.exports = sendMail;
