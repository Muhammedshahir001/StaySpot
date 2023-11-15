const ResortModel = require('../Model/resortModel');
const UserModel = require('../Model/userModel');
const StaffModel = require('../Model/staffModel')
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Razorpay = require("razorpay");
const AdventureModel = require('../Model/AdventureModel')
const DestinationModel = require('../Model/DestinationModel')
const BookingModel = require('../Model/bookingModel')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
const Review = require('../Model/reviewModel');

const sendMail = require("../Service/fmail")
const key_id = process.env.SECRET_KEY_ID;
const key_secret = process.env.KEY_SECRET

module.exports.UserResort = async (req, res, next) => {
    try {

        const resortt = await ResortModel.find({ verify: 'verified' });

        // console.log(resortt);


        res.status(200).json({ resortt, success: true });
    } catch (error) {
        console.log(error, "error consoling...");
    }
};
module.exports.getoneresort = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const user = token ? true : false

        let resortId = req.params.id;
        let oneresortdata = await ResortModel.findById(resortId).populate(
            "resortowner"
        );
        res.status(200).json({ oneresortdata, success: true, user });
    } catch (error) {
        res.json({ message: error.message });
    }
};


module.exports.getsimilarstay = async (req, res, next) => {
    try {
        const place = req.params.data;
        const similarStays = await ResortModel.find({
            verify: true,
            place,

        });

        res.json({ success: true, similarStays });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ success: false, message: "Failed to fetch similar stays" });
    }
};


module.exports.UserAdventure = async (req, res, next) => {
    try {
        const adventure = await AdventureModel.find({ verify: true })

        res.status(200).json({ adventure, success: true })
    } catch (error) {
        console.log(error, "error occur.....");

    }
};
module.exports.getoneAdv = async (req, res) => {
    try {


        let advId = req.params.id;
        let oneAdvData = await AdventureModel.findById(advId).populate("resortowner");
        res.status(200).json({ oneAdvData, success: true });
    } catch (error) {

        console.log(error, "error in the adventure detalis page...");

    }
}

module.exports.UserDestinations = async (req, res) => {
    try {
        const destination = await DestinationModel.find({ verify: true })
        res.status(200).json({ destination, success: true })
    } catch (error) {
        console.log(error, "error occuse in the Destination page....");

    }
};


module.exports.getonedest = async (req, res) => {

    try {

        let destId = req.params.id;
        let onedestdata = await DestinationModel.findById(destId).populate(
            "resortowner"
        );
        res.status(200).json({ onedestdata, success: true });
    } catch (error) {
        console.log(error);
    }
};


module.exports.updatePassword = async (req, res) => {

    const _id = req.userId;
    const { old, newPass } = req.body;
    try {
        let user = await UserModel.findById(_id);
        const isMatch = await bcrypt.compare(old, user.password);

        if (isMatch) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(newPass.trim(), salt);
            const userupdate = await UserModel.findByIdAndUpdate(
                { _id },
                { $set: { password: hashPassword } }
            );
            res.json({ status: "success", result: userupdate });
        } else {
            res.json({ status: "failed", message: "credentials are incorrect" });
        }
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

module.exports.getStaff = async (req, res) => {
    try {

        const id = req.params.id
        console.log(id, "userid");


        const staff = await StaffModel.find({ _id: id })

        // console.log(staff, "staff..................---------");

        res.json({ success: true, result: staff })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })

    }
}



module.exports.resortBook = async (req, res) => {
    try {
        const { resortId, traveler, fromDate, toDate, payment, count_Rooms } = req.body;
        // console.log(fromDate, "fromDate.....",);
        // console.log(toDate, "toDate..............");

        const formatDate = (dat) => {
            const date = new Date(dat);
            const day = date.getDate();
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            return `${day}/${month}/${year}`
        }
        const traveller = await UserModel.findOne({ email: traveler.email })
        const resort = await ResortModel.findOne({ _id: resortId });
        if (count_Rooms > resort.number_room) {
            return res.status(400).json({ error: "Insufficient rooms available in the resort" })
        }
        const newRoomsAvailable = resort.number_room - count_Rooms;
        await ResortModel.findByIdAndUpdate(resort._id, { $set: { number_room: newRoomsAvailable } })
        const existingBooking = await BookingModel.findOne({
            resortId: resort._id,
            $or: [
                { status: { $eq: "booked" } },
                { status: { $ne: "cancelled" } }
            ],
            fromDate: formatDate(fromDate),
            toDate: formatDate(toDate)
        });

        if (existingBooking) {
            return res.status(400).json({ error: "Resort already booked for the selected dates" })
        }
        if (payment === "cod") {
            const update_from = formatDate(fromDate);
            const update_to = formatDate(toDate);
            const fromDatePart = update_from.split("/");
            const toDatePart = update_to.split("/")
            const fromDateObj = new Date(

                fromDatePart[2],
                fromDatePart[1] - 1,
                fromDatePart[0]
            );

            const toDateObj = new Date(
                toDatePart[2],
                toDatePart[1] - 1,
                toDatePart[0]
            );
            const timeDifference = toDateObj.getTime() - fromDateObj.getTime();
            const dayCount = Math.ceil(timeDifference / (1000 * 60 * 24));




            const newBooking = new BookingModel({
                resortId: resort._id,
                traveler: traveller,
                fromDate: formatDate(fromDate),
                toDate: formatDate(toDate),
                Booked_at: new Date(),
                "payment.payment_method": payment,
                "payment.payment_amount": resort.price,
                selected_rooms: count_Rooms,
            });

            const savedBooking = await newBooking.save();
            res.json({ savedBooking, success: true })

        } else {
            try {
                // formatting the date 
                const update_from = formatDate(fromDate);
                const update_to = formatDate(toDate);
                const fromDatePart = update_from.split("/");
                const toDatePart = update_to.split("/");
                const fromDateObj = new Date(
                    fromDatePart[2],
                    fromDatePart[1] - 1,
                    fromDatePart[0]
                );
                const toDateObj = new Date(
                    toDatePart[2],
                    toDatePart[1] - 1,
                    toDatePart[0]
                );

                const timeDifference = toDateObj.getTime() - fromDateObj.getTime();
                const dayCount = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
                // console.log(dayCount, "dayCount............");



                const instance = new Razorpay({
                    key_id,
                    key_secret

                });

                const options = {
                    amount: ((resort.price * 100) * count_Rooms) * dayCount,
                    currency: "INR",
                    receipt: crypto.randomBytes(10).toString("hex"),
                };
                instance.orders.create(options, (error, order) => {
                    if (error) {
                        console.log(error, "909099");
                        return res.status(500).json({ message: "something went wrong" });
                    }


                    res.status(200).json({ data: order });
                });

            } catch (error) {
                console.log(error, "error ocuur");
                res.status(500).json({ message: "INTERNAL SERVER ERROR" });

            }
        }
    } catch (error) {
        console.log(error, "Error occur in the booking page...");

    }
};

module.exports.verifyPayment = async (req, res) => {
    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            resortdat,
            checkInDate,
            checkOutDate,
            paymentt,
            real_amount, count_room

        } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", key_secret)
            .update(sign.toString())
            .digest("hex");
        if (razorpay_signature === expectedSign) {
            const user = req.userId;
            const bookedresort = resortdat;




            // this is written for saving the day of count in database and the day should be stored in database
            const formatDate = (dateString) => {
                const date = new Date(dateString);
                const day = date.getDate();
                const month = date.getMonth() + 1; // Months are zero-based
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            };
            const update_from = formatDate(checkInDate);

            const update_to = formatDate(checkOutDate);
            const fromDatePart = update_from.split("/");
            const toDatePart = update_to.split("/");
            const fromDateObj = new Date(
                fromDatePart[2],
                fromDatePart[1] - 1,
                fromDatePart[0]
            );
            const toDateObj = new Date(
                toDatePart[2],
                toDatePart[1] - 1,
                toDatePart[0]
            );

            const timeDifference = toDateObj.getTime() - fromDateObj.getTime();
            const dayCount = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));


            const newBooking = new BookingModel({
                resortId: bookedresort,
                traveler: user,
                fromDate: formatDate(checkInDate),
                toDate: formatDate(checkOutDate),
                Booked_at: new Date(),
                "payment.payment_method": paymentt,
                "payment.payment_amount": real_amount,
                "payment.payment_status": "completed",
                "payment.payment_id": razorpay_payment_id,
                selected_rooms: count_room,
            });
            const savedBooking = await newBooking.save();
            res.json({
                savedBooking,
                success: true,
                message: "Payment Verified Successfully",
            });

        } else {
            return res.status(400).json({ message: "Invalid Signature sent" });
        }
    } catch (error) {
        console.log(error, "oooooooooooo");
    }
};


module.exports.getbookedData = async (req, res) => {
    try {

        const id = req.userId;

        let bookedresort = await BookingModel.find({ traveler: id })
            .populate("resortId", "resortname address price place image")
            .sort({ Booked_at: -1 });



        res.status(200).json({ result: bookedresort });
    } catch (error) {
        console.log(error, "Error occur in the booking data page");
        res.status(500).json({ error: "An error occurred while fetching booking data" });
    }
}



module.exports.CancelBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const bookingDatas = await BookingModel.findById(bookingId);

        if (!bookingDatas) {
            return res.status(404).json({ message: "Bookings not found" });
        }

        if (bookingDatas.status === "cancelled") {
            return res.status(400).json({ message: "Bookings is already cancelled" });
        }

        const updatingBooking = await BookingModel.findByIdAndUpdate(
            bookingId,
            { $set: { status: "cancelled", 'payment.payment_status': "cancelled" } },
            { new: true }
        );

        if (!updatingBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Get the resortId from the updatingBooking data
        const resortId = updatingBooking.resortId;

        // Find the corresponding resort data
        const resortData = await ResortModel.findById(resortId);
        // console.log(resortData, "resort data in booking...")

        if (!resortData) {
            return res.status(404).json({ message: "Resort data is not founded" });
        }

        // Increment the selectedRooms count by the number of rooms booked in this particular booking time
        const roomsBooked = updatingBooking.selected_rooms;
        // console.log(roomsBooked, "Number of  rooms booked...")
        resortData.number_room += roomsBooked;

        // Saving  the updated resort datas
        await resortData.save();

        return res.json({
            message: "Booking is  cancelled successfully",
            data: updatingBooking,
        });
    } catch (error) {
        console.log(error, "error consoling....");
        return res.status(500).json({ message: "Internal Server Errors" });
    }
};

let uEmail;

module.exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        uEmail = email
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a reset token and save it in the user's document
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiry;

        await user.save();

        // Create a reset URL with the token
        const resetURL = `${process.env.BASE_URL}/resetPassword/${resetToken}`;

        // Send an email to the user with the reset URL
        sendMail(
            user.email,
            'Password Reset',
            `You are receiving this email because you (or someone else) have requested the reset of the password for your account. Please click on the following link to reset your password: ${resetURL}`
        );

        res.status(200).json({ message: 'Password reset email sent. Check your inbox.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Function to handle password reset
module.exports.resetPassword = async (req, res) => {

    try {

        const { token } = req.body;
        const email = uEmail


        const { password } = req.body;
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        // Find the user with the provided reset token
        const user = await UserModel.findOneAndUpdate({ email: email }, { $set: { password: hashPassword } });


        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
        }
        // Generate a new JWT token and send it back to the user for authentication
        const userId = user._id;
        const newToken = jwt.sign({ userId, role: 'user' }, process.env.JWT_SECRET_KEY, {
            expiresIn: '5m',
        });
        uEmail = undefined

        res.status(200).json({ message: 'Password reset successful. You can now log in with your new password.', token: newToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};




module.exports.addReview = async (req, res) => {
    try {
        const { content, stars } = req.body;
        const { userId } = req; // Assuming you've extracted the user ID from the token
        const resortId = req.params.resortId;

        const review = new Review({
            user: userId,
            resort: resortId,
            content,
            stars
        });

        const savedReview = await review.save();

        res.status(201).json({ success: true, review: savedReview });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports.getReviewsByResortId = async (req, res) => {
    try {
        const resortId = req.params.resortId;
        const reviews = await Review.find({ resort: resortId }).populate('user', 'name'); // Assuming 'user' is a reference to the User model

        res.status(200).json({ success: true, reviews });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}









