const UserModel = require("../Model/userModel");
const StaffModel = require("../Model/staffModel");
const AdminModel = require("../Model/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendmail = require("../Service/mail");
const { verifyLink, verifyStaffLink } = require("../Middleware/authUser");

module.exports.register = async (req, res, next) => {

    try {
        const { name, email, phone, password } = req.body;
        const existingemail = await UserModel.findOne({ email });

        if (existingemail) {
            res.status(409).json({ error: "Email is already registered or password", created: false });
        } else {
            const user = new UserModel({ name, email, phone, password });
            const verificationLink = `${process.env.BASE_URL}/verifyEmail/${user._id}`;
            const mail = await sendmail(
                email,
                "Verification mail is sended check it out..",
                `<div style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background-image: url('https://res.cloudinary.com/dqlhedl48/image/upload/v1699421694/jy68uar8f8zkgc9yvumt.gif');  background-position: center; background-size: 100%;">

                <div style="background-color: rgba(255, 255, 255, 0.85); max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
                    <h1 style="color: #333;">Account Verification</h1>
                    <p style="color: #000000;">Click the link below to verify your email:</p>
                    <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px; margin-top: 20px;">Verify Email</a>
                </div>
        
                </div>`
            );
            if (mail) {
                const newUser = await user.save();
                if (newUser) {

                    res.status(201).json({ user, created: true });
                } else {
                    res.status(400);
                    throw new Error('Invalid user Data')
                }

            }

        }
    } catch (error) {
        console.log(error);

        res.json({ error, created: false });
    }
};
module.exports.login = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            if (user.verifiyd || user.is_google) {

                const validpassword = await bcrypt.compare(password, user.password);
                
                if (validpassword) {
                    const userId = user._id;
                    const token = jwt.sign({ userId, role: 'user' }, process.env.JWT_SECRET_KEY, {
                        expiresIn: "1d",
                    });

                    res
                        .status(200)
                        .json({
                            user,
                            token,
                            created: true,
                            message: "Login Successfully",
                        });
                } else {
                    const errors = { password: "password is incorrect" };
                    res.json({ errors, created: false });
                }
            } else {
                const errors = { email: "not verified" };
                res.json({ errors });
            }
        } else {
            const errors = { email: "Please Signup to Login" };
            res.json({ errors, created: false });
        }
    } catch (error) {
        console.log(error);

        res.json({ error, created: false });
    }
};
module.exports.verifyuser = async (req, res) => {
    try {

        const { id } = req.params;

        const result = await verifyLink(id);

        if (!result) {
            throw new Error("cannot verify the user");
        }
        const resultId = result._id
        const token = jwt.sign({ resultId, role: 'user' }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
        });
       
        res.json({ success: { status: true }, result, token });
    } catch (error) {
        res.json({ error: error.message });
    }
};
module.exports.isUserAuth = async (req, res, next) => {
    try {

        let userDetials = await UserModel.findById(req.userId);

        res.json({
            auth: true,
            _id: userDetials._id,
            name: userDetials.name,
            email: userDetials.email,
            phone: userDetials.phone,
        });
    } catch (error) {
        res.json({ auth: false, status: "error", message: error.message });
    }
};
module.exports.isStaffAuth = async (req, res, next) => {
    try {

        let staffDetails = await StaffModel.findById(req.staffId);

        staffDetails.auth = true;
        if (staffDetails) {
            res.json({
                auth: true,
                _id: staffDetails._id,
                name: staffDetails.name,
                email: staffDetails.email,
                phone: staffDetails.phone,
            });
        }
    } catch (error) {
        res.json({ auth: false, message: error.message });
    }
};
module.exports.staffreg = async (req, res, next) => {
    try {

        const { name, email, phone, password } = req.body;
        const existingemail = await StaffModel.findOne({ email });

        if (existingemail) {
            res.json({ error: "email is already existed" })
        }
        else {
            const staffuser = await StaffModel.create({ name, email, phone, password });
            const verificationLink = `${process.env.BASE_URL}/staff/verifyStaffEmail/${staffuser._id}`

            sendmail(
                email,
                "please Activate your account As a resort owner",
                `Click the link below to verify your email:<br><a href="${verificationLink}">${verificationLink}</a>`

            );


            res.status(201).json({ staffuser, created: true });
        }
    } catch (error) {
        console.log(error);

        res.json({ error, created: false });
    }
};
module.exports.stafflogin = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        const staff = await StaffModel.findOne({ email });

        if (staff) {
            if (staff.verified) {
                if (staff.admin_approval === "Unblock") {

                    const auth = await bcrypt.compare(password, staff.password);

                    if (auth) {
                        const staffId = staff._id;

                        const token = jwt.sign({ staffId, role: 'staff' }, process.env.JWT_SECRET_KEY, {
                            expiresIn: 30000,
                        });

                        res.status(200).json({ staff, token, created: true });
                    } else {
                        const errors = { password: "Password is incorrect" };
                        res.json({ errors, created: false });
                    }
                } else {
                    const errors = { message: "Sorry You cannot  access this page" };
                    res.json({ errors, created: false });
                }
            } else {
                const errors = { email: "Email not verified" };
                res.json({ errors, created: false });
            }
        } else {
            const errors = { email: "No user with the entered email address" };
            res.json({ errors, created: false });
        }
    } catch (error) {
        console.log(error);

        res.json({ error, created: false });
    }
};

module.exports.verifystaff = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await verifyStaffLink(id);

        if (!result) {
            throw new Error("cannot verify the user");
        }
        res.json({ success: { status: true } });

    } catch (error) {
        res.json({ error: error.message });
    }
};
module.exports.adminlogin = async (req, res) => {

    try {
        const { email, password } = req.body;
        const admin = await AdminModel.findOne({ email });
        if (admin) {
            const validatePassword = await bcrypt.compare(password, admin.password);
            if (validatePassword) {
                const adminId = admin._id;

                const token = jwt.sign({ adminId, role: 'admin' }, process.env.JWT_SECRET_KEY, {
                    expiresIn: 30000,
                });

                res.status(200).json({ admin, token, created: true });
            } else {
                const errors = { email: "Incorrect email or password" };
                res.json({ errors, created: false });
            }
        } else {
            const errors = { email: "No Admin with this mail id" };
            res.json({ errors, created: false });
        }
    } catch (error) {
        const errors = { email: "something gone wrong" };
        res.json({ errors, created: false });
    }
};
module.exports.isAdminAuth = async (req, res) => {
    try {
        let admin = await AdminModel.findById(req.adminId);
        const admindetails = {
            email: admin.email,
        };

        res.json({
            auth: true,
            result: admindetails,
            status: "success",
            message: "signin success",
        });
    } catch (error) {
        res.status(400).json({ auth: false, message: `something went wrong` });
    }
};

module.exports.googleRegister = async (req, res) => {
    try {
        const { email, id, name, number } = req.body;
        console.log(req.body,"req.bodymmmmmmmmmmmmmmmmmmmmmm");

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.json({
                message: "The email is already registered.",
            });
        } else {
            // Hashing the ID using bcrypt
            const googleUser = new UserModel({
                name,
                email,
                phone: number || "000000000000",
                password: id, // Storing the hashed ID as the password
                is_google: true,
                verifiyd: true, // Assuming 'verified' is the correct property name
            });


            const userData = await googleUser.save();

            if (userData) {
                const userId = userData._id;
                const token = jwt.sign({ userId, role: 'user' }, process.env.JWT_SECRET_KEY, {
                    expiresIn: "1d",
                });

                if (token) {
                    return res.status(200).json({
                        created: true,
                        message: "Google registration successful",
                        token,
                        user: userData
                    });
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.json({ error, created: false });
    }
};



