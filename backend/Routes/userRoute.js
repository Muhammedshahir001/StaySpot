const express = require('express')
const router = express.Router()
const { checkUser } = require('../Middleware/authUser')
const { register, login, verifyuser, isUserAuth,  googleRegister} = require('../Controller/authController')
const { UserResort, getoneresort, getsimilarstay, updatePassword, getStaff, UserAdventure, UserDestinations, getonedest, getoneAdv, getbookedData, resortBook, verifyPayment, CancelBooking, forgotPassword, resetPassword, addReview, getReviewsByResortId } = require('../Controller/userController')
const { createChat, UserChats, findChat } = require('../Controller/ChatControler.js')
const { addMessage, getMessage } = require('../Controller/MessageController.js')

router.get('/')
router.post('/', verifyuser)
router.post('/register', register)
router.post('/login', login)
router.get('/getsimiliarstay/:data', getsimilarstay)
router.post('/verifyEmail/:id', verifyuser)
router.get('/resortList', UserResort)
router.get('/oneResort/:id', getoneresort)
router.get('/isUserAuth', checkUser, isUserAuth)
router.post('/updatePassword', checkUser, updatePassword)
router.get('/getStaffData/:id', checkUser, getStaff)


router.get('/adventureList', UserAdventure)
router.get('/destinations', UserDestinations)
router.get('/oneAdv/:id', getoneAdv)
router.get('/oneDest/:id', getonedest)



// Chatting start

// chat backend begins
router.post('/createChat', checkUser, createChat)
router.get('/getUserChat/:userId', checkUser, UserChats)
router.get('/getchat/find/:firstId/:secondId', checkUser, findChat)
// message beackend
router.post('/addMsg', checkUser, addMessage)
router.get('/getMsg/:chatId', checkUser, getMessage)

//  forgot password
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);
router.post('/RegisterWithGoole', googleRegister)









// Bookings routes

router.post('/bookedResort', checkUser, resortBook)
router.post('/verifyPayment', checkUser, verifyPayment)
router.get('/getBookeddata', checkUser, getbookedData)
router.post('/cancelBooking/:id', checkUser, CancelBooking)

router.post('/addReview/:resortId', checkUser, addReview);
router.get('/reviews/:resortId', checkUser, getReviewsByResortId);






module.exports = router;
