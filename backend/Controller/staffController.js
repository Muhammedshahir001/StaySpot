const ResortModel = require('../Model/resortModel');
const AdventureModel = require('../Model/AdventureModel')
const DestinationModel = require('../Model/DestinationModel')
const cloudinary = require('./config/cloudConfig');
const { ObjectId } = require("mongodb");
const UserModel = require('../Model/userModel');
const { model } = require('mongoose');
const BookingModel = require('../Model/bookingModel')


module.exports.addresort = async (req, res, next) => {
    try {

        let files = Object.values(req.files).flatMap((val) => val);

        let docpath = files.pop().path;
        const promises = files.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path, {
                format: "WebP",
                transformation: [{ width: 500, height: 400 }],
            });
            return result.secure_url;
        });

        const imagess = await Promise.all(promises);
        const doccloud = await cloudinary.uploader.upload(docpath, {
            format: "pdf",
        });

        let imagePaths = [];
        let id = req.staffId;

        let {
            resortname,
            place,
            number_room,
            address,
            description,
            price,
            phone,
            resort_services,
        } = req.body;

        const staffresort = new ResortModel({
            resortname: resortname,
            place: place,
            number_room: number_room,
            address: address,
            description: description,
            image: imagess,
            document: doccloud.secure_url,
            price: price,
            service: resort_services,
            phone: phone,
            resortowner: id,
        });
        const savedResort = await staffresort.save();

        res
            .status(200)
            .json({
                savedResort,
                message: "Resort Added successfully",
                created: true,
            });

    } catch (error) {
        console.log(error, "error in adding...");
        res.json({ message: "Resort adding problem", created: false });
    }
};

module.exports.getResort = async (req, res, next) => {
    try {
        let id = req.staffId;
        const resorts = await ResortModel.find({ resortowner: id });
       
        res.status(200).json({ result: resorts, success: true });
    } catch (error) {
        console.log(error, "error coming in getting");
        res.json({ message: "error while listing the resorts", created: false });
    }
};


module.exports.posteditresort = async (req, res, next) => {
    try {
        const files = Object.values(req.files).flatMap((val) => val);
        let imagePaths = [];

        const id = req.params.id;
        
        // Upload new images to Cloudinary
        const promises = files.slice(0, files.length - 1).map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path, {
                format: "WebP",
                transformation: [{ width: 500, height: 400 }],
            });
            return result.secure_url;
        });

        const newImages = await Promise.all(promises);
        
        for (let i = 0; i < newImages.length; i++) {
            imagePaths.push(newImages[i]);
        }

        let docpath = files[files.length - 1].path;
        const newDoc = await cloudinary.uploader.upload(docpath, {
            format: "pdf",
        });
        const newDocPath = newDoc.secure_url;

        let { resortname, place, number_rooms, address, description, price, phone, service } = req.body;
        console.log(req.body,"this is the body in the edit resort function");
       

        // Update the resort data
        const updatedResort = await ResortModel.findByIdAndUpdate(
            { _id: id },
            {
                resortname: resortname,
                place: place,
                number_room:number_rooms,
                address: address,
                description: description,
                price: price,
                service: service,
                phone: phone,
                image: imagePaths,
                document: newDocPath,
            }
        );

        res.json({
            result: updatedResort,
            message: "Resort updated successfully",
            success: true,
        });

    } catch (error) {
        console.log(error, "error");
        res.json({ message: "Error while updating resort", success: false });
    }
};

module.exports.disableResort = async (req, res, next) => {
    try {
        
        let resortId = req.params.id;
       

        let disresort = await ResortModel.findById(resortId);
        
        const newstatus = disresort.status === "Enable" ? "Disable" : "Enable";
        ResortModel.findOneAndUpdate(
            { _id: resortId },
            { $set: { status: newstatus } }
        ).then((response) => {
            res.status(200).json({ message: "disabled successfully", success: true });
        });
    } catch (error) {
        res.json({ message: "error while disabling....", success: false });
    }
};
module.exports.addAdventure = async (req, res, next) => {
    try {
       
        let id = req.staffId;
       
        const {
            adventureactivity,
            adventureprice,
            adventureTime,
            adventureplace,
            adventureresort,
            adventuredescription,
        } = req.body;

        const images = req.files;
        const imagePaths = images.map((file) => file.path.replace("public", ""));


        const Adventure = new AdventureModel({
            activity: adventureactivity,
            place: adventureplace,
            description: adventuredescription,
            image: imagePaths,
            price: adventureprice,
            time: adventureTime,
            resortowner: id,
            resortName: adventureresort,
        });
        const newAdv = await Adventure.save();

      
        res
            .status(200)
            .json({ newAdv, message: "Adventure Added Success", created: true });
    } catch (error) {
        console.log(error, "eeeeeeeee");
    }
};

module.exports.getAdv = async (req, res) => {
    try {
        let id = req.staffId;
        const objectId = new ObjectId(id);
      
        const adventure = await AdventureModel.find({ resortowner: objectId });

        res.status(200).json({ result: adventure, success: true });
    } catch (error) {
        console.log(error, "66666666666");
    }
};
module.exports.posteditadv = async (req, res, next) => {
    try {
        const id = req.params.id;

        const {
            adventureactivity,
            adventureprice,
            adventureTime,
            adventureplace,
            adventureresort,
            adventuredescription
        } = req.body;

        const images = req.files;
        const imagePaths = images.map((file) => file.path.replace("public", ""));

        // Find the adventure by ID
        const adventure = await AdventureModel.findById(id);

        if (!adventure) {
            return res.status(404).json({ message: "Adventure not found" });
        }

        // Update adventure data
        adventure.activity = adventureactivity;
        adventure.place = adventureplace;
        adventure.description = adventuredescription;
        adventure.image = imagePaths;
        adventure.price = adventureprice;
        adventure.time = adventureTime;
        adventure.resortName = adventureresort;

        // Save the updated adventure
        const updatedAdventure = await adventure.save();

        res.status(200).json({
            result: updatedAdventure,
            message: "Adventure Updated Successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};



module.exports.addDestination = async (req, res) => {
    try {
        const id = req.staffId;
        const { destname, destplace, destabout, destresort } = req.body;
        const images = req.files;
        const imagePaths = images.map((file) => file.path.replace("public", ""));

        const destination = new DestinationModel({
            dest_name: destname,
            about: destabout,
            place: destplace,
            dest_img: imagePaths,
            resortowner: id,
            resortName: destresort,
        });

        const newdest = await destination.save();

        res.status(200).json({ newdest, message: "New Destination Added", created: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred" });
    }
};


module.exports.getDestination = async (req, res) => {
    try {
        let id = req.staffId
        

        const destination = await DestinationModel.find({ resortowner: id });

        res.status(200).json({ result: destination, success: true });

    } catch (error) {
        console.log(error);
    }
}


module.exports.editdestination = async (req, res) => {
    try {
        const id = req.params.id;

        const { name, place, about, destResorts } = req.body;
        const images = req.files;
        const imagePaths = images.map((file) => file.path.replace("public", ""));

        const destination = await DestinationModel.findByIdAndUpdate(
            { _id: id },
            {
                dest_name: name,
                place: place,
                about: about,
                dest_img: imagePaths,
                resortName: destResorts,
            },
            { new: true } // This option returns the updated document
        );

        if (destination) {
            res.json({ result: destination, message: "Destination Updated Successfully", success: true });
        } else {
            res.status(404).json({ message: "Destination not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports.getStaf = async (req, res) => {
    try {
        const id = req.params.id
        const user = await UserModel.find({ _id: id })
        
        res.json({ success: true, result: user })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })

    }
}

module.exports.getbookedresort = async (req, res) => {
    try {
        let id = req.staffId;
        const resortId = await ResortModel.find({ resortowner: id });
        const booked = await BookingModel.find({ resortId }).populate('traveler').populate('resortId');

        // Calculate total payments
        const totalPayments = booked.reduce((total, booking) => {
            return total + (booking.payment.payment_amount || 0);
        }, 0);
      

        res.status(200).json({ result: booked, totalPayments, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Could not fetch data" });
    }
};
