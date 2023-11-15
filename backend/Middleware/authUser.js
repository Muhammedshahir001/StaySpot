const jwt = require('jsonwebtoken');
const User = require('../Model/userModel');
const Staff = require('../Model/staffModel');
const { model } = require('mongoose');



module.exports.checkUser = (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.send({ status: false, message: "Failed there is no token" });
            

        } else {
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
               
                if (err) {
                    res.json({ status: false, message: "failed...." });
                } else {
                    req.userId = decodedToken.userId;
                    if (decodedToken.role == 'user') {
                       
                        next();

                    }
                    else {
                        res.json({ message: "Role not verified..." })
                    }
                }
            });
        }

    } catch (error) {
        console.log(error, "error occur...");

    }
};

module.exports.checkStaff = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.send({ status: false, message: "failed there is  no token" });
        } else {
            jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
                if (err) {
                    console.log(err);
                    res.json({ status: false, message: "failed at verifying process.." });
                } else {
                    req.staffId = decodedToken.staffId;
                    if (decodedToken.role == 'staff') {

                        next();
                    }
                    else {
                        res.json({ message: "Role not verified" })
                    }


                }
            });
        }
    } catch (error) {
        console.log(error, "error occur..");
    }
};

module.exports.checkAdmin = (req, res, next) => {
    try {

        if (req.headers.authorization) {
            const token = req.headers.authorization?.split(" ")[1];
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
                if (err) {
                    res.json({ status: false, message: "token expired" });
                } else {
                    req.adminId = decodedToken.adminId;
                    if (decodedToken.role == 'admin') {

                        next();
                    }
                    else {
                        res.json({ message: "Role not verified" })
                    }
                }
            });
        } else res.json({ status: false, message: "didn't get token" });
    } catch (error) {
        res.json({ status: false, message: "something went wrong" });
    }
};

module.exports.verifyLink = async (userId) => {
    try {
        console.log("staff verify link working...");
        let user = await User.findByIdAndUpdate(
            userId,
            { $set: { verifiyd: true } },
            { new: true }
        );
        return user;

    } catch (error) {
        console.log({ status: true, message: "Verification is sucess" });

    }
};

module.exports.verifyStaffLink = async (staffId) => {
    try {
        console.log("The staff verify link is processing");
        let staff = await Staff.findByIdAndUpdate(
            staffId,
            { $set: { verified: true } },
            { new: true }
        );
        console.log(staff, "processing..");
        return staff;
    } catch (error) {
        console.log(error, 'error is occured in the link');

    }
};