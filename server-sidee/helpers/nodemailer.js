const nodemailer = require('nodemailer');


const sendEmail = (recipientEmail) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tanyaardhia4@gmail.com',
      pass: process.env.pass,
    },
  });

  const mailOptions = {
    from: 'tanyaardhiapramesti@gmail.com',
    to: recipientEmail,
    subject: "Terims Kasih Telah mendaftar",
    text: "selamat anda berhasil register di Ethereal Movies",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendEmail;