import { adminAxiosInstance } from "../axios/instance";


const adminlogin = (data) => {
    return adminAxiosInstance.post('/adLogin', data)
}
const getAllData = () => {
    console.log('getting')
    return adminAxiosInstance.get('/getallResortData')
}
const approveresort = (id) => {
    console.log("approve or reject")
    return adminAxiosInstance.post(`/approveresort/${id}`)
}
const getuniqueresort = (id) => {
    console.log('resort view page working')
    return adminAxiosInstance.get(`/getUniqueResort/${id}`)
}
const authAdmin = () => {
    // console.log('privete root of admin is going to backend ')
    return adminAxiosInstance.get('/isAdminauth')
}

const getAllstaff = () => {
    console.log("getting data....")
    const response = adminAxiosInstance.get("/getAllstaff")
    console.log(response,"allstafeeeeeeeeeeeeeeee");
    return response
}
const blockstaff = (id) => {
    console.log(id, "blocking working...")
    return adminAxiosInstance.post(`/blockStaff/${id}`,{})
}
const getAlluser = () => {
    console.log("getting data....")
    const response = adminAxiosInstance.get("/getAlluser")
    console.log(response,"ggggggggggggggggggggggg");
    return response
}

const blockuser = (id) => {
    console.log(id, "blocking working...")
    return adminAxiosInstance.post(`/blockUser/${id}`)
}
const rejectresort = (id, data) => {
    console.log(id, "ffffff")
    console.log(data, "rejection reason getting in services...")
    return adminAxiosInstance.post(`/rejectResort/${id}`, { data })
}
const approveresortt = (id) => {
    return adminAxiosInstance.post(`/approvedResort/${id}`)
}


const getAllAdvData = () => {
    console.log("Get all adventure data")
    return adminAxiosInstance.get("/getAllAdvData")
}
const getUniqueAdv = (id) => {
    console.log(id, "uniqqqq")
    return adminAxiosInstance.get(`/getUniqAdv/${id}`)
}

const approveAdvent = (adventId) => {
    console.log("approve or reject.....")
    return adminAxiosInstance.post(`/approveAdvent/${adventId}`)
}

const getallDestData = () => {
    console.log("get all adventure Data")
    return adminAxiosInstance.get("/getAllDestData")
}
const getUniqDest = (id) => {
    console.log(id, "uniqqqq")
    return adminAxiosInstance.get(`/getUniqDest/${id}`)
}
const approveDest = (id) => {
    console.log("approve or reject...Destination")
    return adminAxiosInstance.post(`/approveDest/${id}`)
}

const get_All_Bookings=()=>{
    return adminAxiosInstance.get('/getAllBookings')
}

export { adminlogin, getAllData, approveresort, authAdmin, getuniqueresort, getAlluser, getAllstaff, blockstaff, blockuser, rejectresort, approveresortt, getAllAdvData, getUniqueAdv, approveAdvent, getallDestData, getUniqDest, approveDest, get_All_Bookings }