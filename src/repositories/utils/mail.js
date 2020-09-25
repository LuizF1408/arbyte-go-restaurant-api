const mailgun = require("mailgun-js");
const { MAILGUN_DOMAIN, MAILGUN_API_KEY } = process.env;
const mg = mailgun({
  apiKey: MAILGUN_API_KEY,
  domain: MAILGUN_DOMAIN,
});

exports.sendEMail = async function sendEMail(msg) {
  mg.messages().send(
    {
      from: process.env.SENDER_EMAIL,
      ...msg,
    },
    function (error, body) {
      console.log(body);
    }
  );
};
