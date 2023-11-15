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



//   });
let sendMail = (name, email, reason) => {
    return new Promise((resolve, reject) => {
        let mailOptions;
        if (reason) {
            mailOptions = {
                to: email,
                from: process.env.NODEMAILEREMAIL,
                subject: "Regarding the Resort Approval Confirmation from  StaySpot",
                html:
                    "<h2> Hi" + name + ",</h2>" +
                    "<h3> Sorry to inform you that, your resort is not accepted</h3>" +
                    "<h3 style='font-weight:bold;'> It is because" +
                    reason +
                    "</h3>"
            }
        }
        else {
            mailOptions = {
                to: email,
                from: process.env.NODEMAILEREMAIL,
                subject: "Regarding the Resort Approval Confirmation from Innshot",
                html:
                    "<h2> Hi" + name + ",</h2>" +
                    "<h2 style='font-weight:bold;'>Congratulations!</h2>" +
                    "<h3 >Your Resort is approved.</h3>" +
                    "<h3 style='font-weight:bold;'>The team wishing you a happy Business</h3>"
            }
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject({ status: 'error', error: error })
            }
            else {
                resolve({ status: 'success' })
            }
        })
    })
}

//   return info




// }
// module.exports=sendMail



