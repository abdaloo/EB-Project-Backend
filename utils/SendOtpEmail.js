const nodemailer = require("nodemailer");

const SendOtpEmail = async(to,otp)=>{

    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth:{
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    const mailOptions = {
        from : process.env.SMTP_USER,
        to : to,
        subject : "Otp for Email Verification",
        text : `Your Otp is : ${otp}`
    };

    await transporter.sendMail(mailOptions);

}

module.exports = SendOtpEmail;
