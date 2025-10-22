const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendOtpEmail = async (email, otpCode) => {
  const mailOptions = {
    from: process.env.SMTP_FROM || 'no-reply@example.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otpCode}. It will expire in 10 minutes.`,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendOtpEmail;