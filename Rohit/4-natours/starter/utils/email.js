const nodemailer = require('nodemailer');
const catchAsync = require('./catchAsync');

const sendEmail = catchAsync(async (options) => {
  // 1) Create a transporter
  console.log(process.env.PORT);
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASS,
    },
    // Avtivate in gmail "less secure app" option if sending to Gmail
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Rohit Rajeev <rohitrajeev02@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
});

module.exports = sendEmail;
