import React from "react";
import { Route, Routes } from "react-router-dom";
import StaffLogin from "../pages/staff/Login";
import StaffRegister from "../pages/staff/Register";
import StaffHome from "../pages/staff/StaffHome";

import StaffResort from "../pages/staff/StaffResort";
import AdResort from "../pages/staff/AddResort";
import EditResort from "../pages/staff/EditResort";

import StafAdventure from "../pages/staff/StaffAdventure";

import StaffDest from "../components/staffPages/staffDest";
import AddDestination from "../components/staffPages/addDestination";
import EditDest from "../components/staffPages/editDest";

import EmailVerifystaff from "../components/loginPages/EmailVerifystaff";
import PrivateRoute from "../productRoute/PrivateRoute";
import Error from "../components/Error/Staff";
import Booking from "../components/staffPages/Booking";
import Chatwithuser from "../pages/chat/Chatwithuser";


const StaffRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Error />} />
        <Route path="/staffLogin" element={<StaffLogin />} />
        <Route path="/staffRegister" element={<StaffRegister />} />
        <Route path="/verifyStaffemail/:id" element={<EmailVerifystaff />} />
        <Route
          element={<PrivateRoute role={"staff"} route={"/staff/staffLogin"} />}
        >
          <Route path="/staffHome" element={<StaffHome />} />
          <Route path="/staffResorts" element={<StaffResort />} />
          <Route path="/add-resort" element={<AdResort />} />
          <Route path="/editResort" element={<EditResort />} />

          <Route path="/staffAdventure" element={<StafAdventure />} />
          <Route path="/staffDestination" element={<StaffDest />} />
          <Route path="/add-dest" element={<AddDestination />} />
          <Route path="/editDest" element={<EditDest />} />

          <Route path="/roomBookings" element={<Booking />} />
          <Route path="/chatWithUser" element={<Chatwithuser/>} />
          

        </Route>
      </Routes>
    </>
  );
};

export default StaffRoute;
