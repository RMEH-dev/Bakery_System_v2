const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

const sendReceiptEmail = async (to, subject, text, attachments) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to,
    subject,
    text,
    attachments,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendReceiptEmail };
