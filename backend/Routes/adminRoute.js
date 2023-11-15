const express = require("express");
const router = express.Router();
const { adminlogin, isAdminAuth } = require("../Controller/authController");
const { checkAdmin } = require("../Middleware/authUser");
const { getallresortdata,getAllstaffData,getAlluserData,blockStaff, blockUser,rejectResort,approvedresort,getuniqueresortdata,getallDestData,getUniqueDest,approveDestination,getallAdvData,getuniqueAdvData,approveAdvent,getallbookings} = require("../Controller/adminController")

router.post("/adLogin", adminlogin);
router.get("/getAllResortData", getallresortdata);

router.get("/isAdminauth", checkAdmin, isAdminAuth);
router.get("/getAllstaff", checkAdmin, getAllstaffData);
router.get("/getAlluser", checkAdmin, getAlluserData);
router.post("/blockStaff/:id", checkAdmin, blockStaff);
router.post("/blockUser/:id", checkAdmin, blockUser);
router.post("/rejectResort/:id", checkAdmin, rejectResort);
router.post("/approvedResort/:id", checkAdmin, approvedresort);
router.get("/getUniqueResort/:id", getuniqueresortdata);

router.get("/getAllAdvData", checkAdmin, getallAdvData);
router.get("/getUniqAdv/:id", checkAdmin, getuniqueAdvData);
router.post("/approveAdvent/:id", checkAdmin, approveAdvent);


router.get("/getAllDestData", checkAdmin, getallDestData);
router.get("/getUniqDest/:id", checkAdmin, getUniqueDest);
router.post("/approveDest/:id", checkAdmin, approveDestination);

router.get("/getAllBookings", checkAdmin, getallbookings);









module.exports = router;
