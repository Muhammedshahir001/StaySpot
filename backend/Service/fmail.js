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

async function sendFmail(email, subject, msg) {
    let info = await transporter.sendMail({
        from: process.env.NODEMAILEREMAIL,  // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: msg, // plain text body
        html: `<p>${msg}</p><p>Click the above  link to reset your password</p>`



    });

    return info




}
module.exports = sendFmail



