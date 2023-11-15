const ResortModel = require('../Model/resortModel');
const StaffModel = require('../Model/staffModel');
const AdventureModel = require('../Model/AdventureModel')
const DestinationModel = require('../Model/DestinationModel')
const nodemailer = require('nodemailer');
const UserModel = require('../Model/userModel');
const { model } = require('mongoose');
const BookingModel = require('../Model/bookingModel')

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.NODEMAILEREMAIL, // generated ethereal user
        pass: process.env.NODEMAILERPASS, // generated ethereal password
    },
});

let sendMail = (name, resort, email, reason) => {
    console.log(name, resort, email, reason, "oooooo")
    return new Promise((resolve, reject) => {
        let mailOptions;
        if (reason) {
            mailOptions = {
                to: email,
                from: process.env.NODEMAILEREMAIL,
                subject: "Regarding the Resort Approval Confirmation from  StaySPot",
                html:
                    "<h2> Hi" + name + ",</h2>" +
                    "<h3> Sorry to inform you that, your resort" + resort + "  is not accepted</h3>" +
                    "<h3 style='font-weight:bold;'> It is because" + reason +
                    "</h3>"
            }
        }
        else {
            mailOptions = {
                to: email,
                from: process.env.NODEMAILEREMAIL,
                subject: "Regarding the Resort Approval Confirmation from StaySpot",
                html:
                    "<h2> Hi" + name + ",</h2>" +
                    "<h2 style='font-weight:bold;'>Congratulations!</h2>" +
                    "<h3 >Your Resort  " + resort + " is approved sucessfully.</h3>" +
                    "<h3 style='font-weight:bold;'>The team wishing you a happy journey to start your business carrer</h3>"
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
module.exports.getuniqueresortdata = async (req, res) => {
    try {
        const resortId = req.params.id;
        const resortData = await ResortModel.findById(resortId).populate({
            path: 'resortowner',
            model: 'Staff',
        });

        console.log(resortData, "resort data is unique page...");
        res.status(200).json({ resortData: resortData, success: true }); // Update the property name to "resortData"
    } catch (error) {
        console.log(error, "error is occurred while getting unique page");
        res.json({ message: "error occurred while getting unique page" });
    }
};
module.exports.getallresortdata = async (req, res, next) => {
    try {

        const resort = await ResortModel.find({ status: "Enable" }).populate(
            "resortowner"
        );
        console.log(resort, "admin visible the resort")
        res.status(200).json({ resort, success: true });
    } catch (error) {

        console.log(error);
        res.json({ message: "error in get all resort data in admin side" });
    }
};

module.exports.getallAdvData = async (req, res) => {
    try {
        const adventureActivity = await AdventureModel.find({}).populate('resortowner')
        res.status(200).json({ adventureActivity, success: true })
    } catch (error) {
        console.log(error, "error occured while get the adventure data");

    }
}

module.exports.getuniqueAdvData = async (req, res) => {
    try {
        let advId = req.params.id
        let adventureData = await AdventureModel.findById(advId).populate('resortowner');
        console.log(adventureData, "this is adventure data");
        res.status(200).json({ adventureData, success: true })
    } catch (error) {
        console.log(error, "error is occured while getting the adventure unique data...");

    }
}

module.exports.approveAdvent = async (req, res) => {
    try {
        let adventId = req.params.id
        let approve = await AdventureModel.findById(adventId).populate('resortowner');
        console.log(approve, "approve data ..........");

        const newStatus = approve.verify === false ? true : false;


        let message = newStatus ? 'Adventure approved' : 'Adventure is rejected';

        AdventureModel.findOneAndUpdate({ _id: adventId }, { $set: { verify: newStatus } }).then((response) => {
            res.status(200).json({
                message: message,
                success: true
            });
        });
    } catch (error) {
        res.json({ message: "Error is occured", success: false });

    }
};

module.exports.getallDestData = async (req, res) => {
    try {
        const destination = await DestinationModel.find({}).populate('resortowner');
        res.status(200).json({ destination, success: true })
    } catch (error) {
        console.log(error, "error is occured while getting the destination data...");

    }
};


module.exports.getUniqueDest = async (req, res) => {
    try {
        let destId = req.params.id;
        let destData = await DestinationModel.findById(destId).populate('resortowner');

        console.log(destData, "This is the destination data.......");
        res.status(200). json({ destData, success: true })
    } catch (error) {
        console.log(error, "error is occured while getting the Unique data");

    }
}

module.exports.approveDestination = async (req, res) => {
    try {
        let destId = req.params.id;

        let destination = await DestinationModel.findById(destId).populate('resortowner');
        console.log(destination, "This is the approved destination...");

        const new_status = destination.verify === false ? true : false
        console.log(new_status, "Upated the status in destintion");
        let message = new_status ? 'Destination is approved' : 'Destination is rejected';
        DestinationModel.findOneAndUpdate({ _id: destId }, { $set: { verify: new_status } }).then((response) => {
            res.status(200).json({
                message: message,
                success: true
            });
        });
    } catch (error) {
        res.json({ message: "Error", success: false })

    }
}

module.exports.rejectResort = async (req, res) => {
    try {
        const resortId = req.params.id;
      
        let reject = await ResortModel.findById(resortId).populate('resortowner')
        
        let data = await sendMail(reject.resortowner.name, reject.resortname, reject.resortowner.email, req.body.data)
        console.log(data,"Data in the reject page...");
        
        await ResortModel.updateOne({ _id: resortId }, {
            $set: {
                verify: 'rejected'
                , reject_reason: req.body.data
            }
        }).then((response) => {
            res.status(200).json({ message: "Rejection reason mail sended Successfully" })
        })



    } catch (error) {
        console.log(error, "ERROR OCCURED.....")
    }
};

module.exports.approvedresort = async (req, res) => {
    try {
        let resortId = req.params.id
        console.log(resortId, "id yyyy")
        let approve = await ResortModel.findById(resortId).populate('resortowner')
       

        let info = await sendMail(approve.resortowner.name, approve.resortname, approve.resortowner.email)
        
        await ResortModel.updateOne({ _id: resortId }, { $set: { verify: 'verified' }, $unset: { reject_reason: "" } }).then((response) => {
            res.status(200).json({ message: " Your resort is Approved message emailed successfully.." })
        })


    } catch (error) {
        console.log(error)

    }
}
module.exports.getAllstaffData = async (req, res) => {
    try {
        const staffs = await StaffModel.find({ verified: true });

        res.status(200).json({ staffs, success: true })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports.blockStaff = async (req, res) => {
    try {
        const staffId = req.params.id;

        let staff = await StaffModel.findById(staffId);
        console.log(staff, "blocking ...");

        // Toggle the admin_approval status
        const newStatus = staff.admin_approval === 'Unblock' ? 'Block' : 'Unblock';
        console.log(newStatus, "new status is checking...");

        const message = newStatus === 'Unblock' ? 'Staff Unblocked' : 'Staff Blocked';

        await StaffModel.findOneAndUpdate({ _id: staffId }, { admin_approval: newStatus });

        res.status(200).json({ message: message, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports.getAlluserData = async (req, res) => {
    try {
        const users = await UserModel.find({});
        console.log(users, "usersssssssssssssssssssssssss");

        res.status(200).json({ users, success: true })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports.blockUser = async (req, res) => {
    const userId = req.params.id

    let UserBlock = await UserModel.findById(userId);
    console.log(UserBlock, "User Blocking.......");

    const Newstatus = (UserBlock.status === 'Unblock' ? 'Block' : 'Unblock')
    console.log(Newstatus, "new status finding...");
    let message = Newstatus === 'Unblock' ? 'User UnBlocked' : 'User Blocked'
    UserModel.findOneAndUpdate({ _id: userId }, { $set: { status: Newstatus } }).then((response) => {
        res.status(200).json({ message: message, success: true });
    })
}

// module.exports.getallbookings = async (req, res) => {
//     try {

//         const resortbookings = await BookingModel.find({}).populate('traveler').populate('resortId')
//         console.log("ggggggggggggggggg",resortbookings,"resortbookings in the admin Controller ");

//         res.status(200).json({ result: resortbookings, success: true })
//     } catch (error) {
//         console.log(error, "Error occured whilw getting of the booking page")

//     }
// }
module.exports.getallbookings = async (req, res) => {
    try {
        const resortbookings = await BookingModel.find({}).populate('traveler').populate('resortId');
        const totalPaymentsPerResort = resortbookings.reduce((acc, booking) => {
            if (!acc[booking.resortId._id]) {
                acc[booking.resortId._id] = 0;
            }
            acc[booking.resortId._id] += booking.payment.payment_amount || 0;
            return acc;
        }, {});

        res.status(200).json({ result: resortbookings, totalPaymentsPerResort, success: true });
    } catch (error) {
        console.log(error, "Error occurred while getting the booking page");
        res.status(500).json({ error: "An error occurred" });
    }
};
