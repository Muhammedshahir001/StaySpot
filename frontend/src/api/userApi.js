import { userAxiosInstance } from "../axios/instance";
const userregister = (data) => {
    console.log(data);
    return userAxiosInstance.post("/register", data);
};
const userlogin = (data) => {
    
    return userAxiosInstance.post("/login", data);
};
const userverify = (data) => {
    return userAxiosInstance.post(`/verifyEmail/${data}`);
};
const getuserresort = () => {
   
    return userAxiosInstance.get("/resortList");
};
const authUser = () => {
   
    return userAxiosInstance.get("/isUserAuth");
};
const getresortdata = (id) => {
    return userAxiosInstance.get(`/oneResort/${id}`);
};
const getsimiliarstay = (data) => {
    return userAxiosInstance.get(`/getsimiliarstay/${data}`);
};
const getuseradventure = () => {
    
    return userAxiosInstance.get("/adventureList");
};
const getuserdestination = () => {
    return userAxiosInstance.get("/destinations");
};
const getDestinationData = (id) => {
    return userAxiosInstance.get(`/oneDest/${id}`);
};


const getadvData = (id) => {
    return userAxiosInstance.get(`/oneAdv/${id}`);
};


const updatePassword = (data) => {
  
    return userAxiosInstance.post("/updatePassword", data);
};


const getUser = (id) => {
   try{

       return userAxiosInstance.get(`/getStaffData/${id}`)
   }catch{}
}



const booked_Resort = (data) => {
 
    return userAxiosInstance.post("/bookedResort", data);
};
const verifyRazorpay = (data) => {
    
    return userAxiosInstance.post("/verifyPayment", data);
};
const get_Booked_Data = () => {
   
    return userAxiosInstance.get("/getBookeddata");
};
const CancelBook = (BookingId) => {
   
    return userAxiosInstance.post(`/cancelBooking/${BookingId}`);
};
// Function to initiate the password reset process

const forgotPassword = (email) => {
    return userAxiosInstance.post("/forgotPassword", { email });
};


// Function to reset the user's password
const resetPassword = (data) => {
   
    return userAxiosInstance.post("/resetPassword", data);
    
};
const SendId = (sentid, receiveid) => {
    return userAxiosInstance.post('/createChat', {
        senderId: sentid,
        receiverId: receiveid,
    })
}
const userChats = (id) => {
    // shows user msgd resortowners
    console.log(id, "this is the id in the userChat........");
    return userAxiosInstance.get(`/getUserChat/${id}`);

}
const getMessages = (id) => {
    console.log(id, "id getting the getMessages..")
    return userAxiosInstance.get(`/getMsg/${id}`)
}
const adMessage = (data) => {
    // console.log(data, "addmessage")
    return userAxiosInstance.post('/addMsg', data)
}

const userGoogleRegister = (userData) => {
    try {
        console.log(userData,"userData......");
        
        return userAxiosInstance.post('/googleRegister', userData);
        
    } catch (error) {
        console.log(error,"error in the google authication ");
        
    }
};

const userRegisterGoogle =(userData) =>{
    try {
        return userAxiosInstance.post("/RegisterWithGoole", userData)
        
    }catch(error){
        console.log(error);
    }
}

 const addReview = async (resortId, reviewData) => {
    try {
        const response = await userAxiosInstance.post(`/addReview/${resortId}`, reviewData);
        return response.data; // Assuming the response contains relevant data
    } catch (error) {
        throw error;
    }
};
const getReviews = (resortId) => {
    return userAxiosInstance.get(`/reviews/${resortId}`);
};






export {
    userregister,
    userlogin,
    userverify,
    getuserresort,
    authUser,
    getresortdata,
    getadvData,
    updatePassword,
    getUser,
    getsimiliarstay,
    getuseradventure,
    getuserdestination,
    getDestinationData,
    booked_Resort,
    verifyRazorpay,
    get_Booked_Data,
    CancelBook,
    forgotPassword,
    resetPassword,
    userChats,
    getMessages,
    adMessage,
    SendId,
    userGoogleRegister,
    userRegisterGoogle,
    addReview,
    getReviews
    
 


   
 
};
