import { staffAxiosInstance } from "../axios/instance";

const staffregister = (data) => {
    console.log(data, "data of the staff register page ")
    return staffAxiosInstance.post('/staffRegister', data)
}


const stafflogin = (data) => {
    console.log(data, "data of thelogin  staff")
    return staffAxiosInstance.post('/staffLogin', data)
}
const staffverify = (data) => {
    console.log(data, "data of staff")
    return staffAxiosInstance.post(`/verifyStaffEmail/${data}`)
}
const staffresort = (data) => {
    console.log(data, "ggggggggggggggggggggggg")
    return staffAxiosInstance.post('/add-resort', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        timeout: 10000  // 5 seconds timeout
    })
}
const getResortData = () => {
    console.log("resort details")
    return staffAxiosInstance.get('/getResortData')
}
const editpostresortdatas = async (data, id) => {
    try {
        const response = await staffAxiosInstance.post(`/postEditResort/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 20000  // 20 seconds timeout // Increase the timeout as needed
        });
        return response.data;
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            throw new Error('Request timed out. Please check your network connection and try again.');
        } else {
            console.error('An error occurred while making the request:', error);
            throw error;
        }
    }
};


const disableresort = (id) => {
    console.log(id, " resort is disable working...")
    return staffAxiosInstance.post(`/disableResort/${id}`)
}
const authStaff = () => {
    console.log("authstaff is loading")
    return staffAxiosInstance.get('/isStaffAuth')
}
const staffAdv = (data) => {
    return staffAxiosInstance.post('/add-adv', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
const getStaffAdv = () => {
    return staffAxiosInstance.get('/getAdvData')
}

const editAdvPost = (id, data) => {
    console.log(data, "This is  the data in the Editadvenyure");
    return staffAxiosInstance.post(`/postEditAdv/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }

    })
}


const AddDes = (data) => {
    return staffAxiosInstance.post('/add-dest', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }

    })
}
const getDest = () => {
    return staffAxiosInstance.get('/getDestData')
}

const editDestination = (data, id) => {
    return staffAxiosInstance.post(`/postEditdest/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        timeout: 10000, // Adjust the timeout value as needed (e.g., 10 seconds)
    })
}


const get_Book_Data = () => {
    return staffAxiosInstance.get('/getBookedResortdata')
}




const getStaff = (id) => {
    return staffAxiosInstance.get(`/getUserData/${id}`);
}



const staffChats = (id) => {
    console.log(id, "staff id in api call chat")
    return staffAxiosInstance.get(`/getStaffchat/${id}`)
}
const getstaffMessages = (id) => {
    return staffAxiosInstance.get(`/getStaffMsg/${id}`)
}
const addMsg = (data) => {
    return staffAxiosInstance.post('/adMsg', data)
}






export {
    staffregister,
    stafflogin,
    staffresort,
    staffverify,
    getResortData,
    editpostresortdatas,
    disableresort,
    authStaff,
    getStaff,
    staffAdv,
    getStaffAdv,
    editAdvPost,
    AddDes,
    getDest,
    editDestination,
    get_Book_Data,
    staffChats,
    getstaffMessages,
    addMsg

}
