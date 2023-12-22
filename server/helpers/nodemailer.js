
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'why.yuragil@gmail.com',
        pass: 'vyqa znbe ufva afxc'
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const sendVerificationEmail = async (userEmail, verifyToken) => {
    try {
        await transporter.sendMail({
            from: 'why.yuragil@gmail.com',
            to: userEmail,
            subject: 'Verifikasi Email Anda',
            html: `<p>Untuk memverifikasi email Anda, silakan klik <a href="http://localhost:5173/verify-email?token=${verifyToken}">link ini</a>.</p>`
        });
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    sendVerificationEmail
}