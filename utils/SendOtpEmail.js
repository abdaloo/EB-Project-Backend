const nodemailer = require("nodemailer");

const SendOtpEmail = async(to,otp)=>{

    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth:{
            user: process.env.SMTP_User,
            pass: process.env.SMTP_Password
        }
    });

    const mailOptions = {
        from : process.env.SMTP_User,
        to : to,
        subject : "Otp for Email Verification",
        text : `Your Otp is : ${otp}`
    };

    await transporter.sendMail(mailOptions);

}

module.exports = SendOtpEmail;
