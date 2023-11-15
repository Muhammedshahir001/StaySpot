import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { authUser } from '../api/userApi'
import { authAdmin } from '../api/adminApi'
import { authStaff } from '../api/Staffapi';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { setUserDetails, userlogout } from '../redux/userSlice';
import { adminlogin, adminlogout } from '../redux/adminSlice';
import { setStaffDetails, staffLogout } from '../redux/staffSlice';


function PrivateRoute({ role, route }) {
    let [auth, setAuth] = useState(null);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {

        if (role === 'user') {

            authUser().then((response) => {

                if (!response.data.auth) {

                    localStorage.removeItem('usertoken')
                    dispatch(userlogout())
                }
                else if (response.data.auth) {
                    console.log(response.data, "ggggggggggg")
                    dispatch(setUserDetails(response.data))

                }
                setAuth(response.data?.auth)
            }).catch((response) => {
                console.log(response, "aaaa")
                setAuth(response.data?.auth)
                navigate('/login')

            })

        } else if (role === 'admin') {

            authAdmin().then((respo) => {

                console.log(respo, "data")
                if (!respo.data.auth) {
                    localStorage.removeItem('admintoken')

                    dispatch(adminlogout())

                }
                else if (respo.data.auth) {
                    console.log(respo.data.auth, "admin email getting.........")
                    console.log(respo.data.result)
                    dispatch(adminlogin(respo.data.result))
                }
                setAuth(respo.data?.auth)
            })
                .catch(respo => {
                    setAuth(respo.data?.auth)

                    navigate('/admin/adLogin')

                })
        } else if (role === 'staff') {
            authStaff().then(respon => {
                if (!respon.data.auth) {
                    localStorage.removeItem('stafftoken')
                    dispatch(staffLogout())
                }
                else {
                    dispatch(setStaffDetails(respon.data))
                }
                setAuth(respon.data.auth)
            }).catch(respon => {
                setAuth(respon.data?.auth)
                navigate('/staff/staffLogin')
            })
        }
    }, [])
    if (auth === null) return


    return (
        auth ? <Outlet /> : <Navigate to={route} />
    )
}

export default PrivateRoute