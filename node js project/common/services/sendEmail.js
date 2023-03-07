const nodemailer = require("nodemailer");
module.exports = async (listEmail, content) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER, // generated ethereal user
      pass: process.env.SENDER_PASSWORD, // generated ethereal password
    },
  });
  try {
    let info = await transporter.sendMail({
      from: '" Node Exam :) 👻" <process.env.SENDER>', // sender address
      to: listEmail.join(","), // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: content, // html body
    });
    return info;
  } catch (error) {
    console.log(error);
  }
};