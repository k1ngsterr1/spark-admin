const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    pool: true,
    host: "webmail.sparkstudio.kz",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};
