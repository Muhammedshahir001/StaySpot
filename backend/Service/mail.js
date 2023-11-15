"use strict";
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.NODEMAILEREMAIL, // generated ethereal user
        pass: process.env.NODEMAILERPASS, // generated ethereal password
    },
});

async function sendmail(email, subject, msg) {
     await transporter.sendMail({
        from: process.env.NODEMAILEREMAIL,  // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: msg, // plain text body
        html: `<p>${msg}</p><p>Click the above  link to activate your account</p>`



    });

    return true;




}
module.exports = sendmail



