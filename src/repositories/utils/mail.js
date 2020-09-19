const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEMail = async function sendEMail(msg) {
  try {
    const response = await sgMail.send({
      from: process.env.SENDER_EMAIL,
      ...msg,
    });

    console.log("SG", response);
  } catch (error) {
    console.log("SG", error);
  }
};
