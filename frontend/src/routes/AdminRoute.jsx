import React from "react";
import { Route, Routes } from "react-router-dom";
import ResortList from "../pages/Admin/ResortList";
import PendingRequest from "../components/AdminPages/pendingRequest";
import ViewResort from "../components/AdminPages/ViewResort";
import AdminLogin from "../pages/Admin/Login";
import Adminhome from "../pages/Admin/Dashboard";
import PrivateRoute from "../productRoute/PrivateRoute";
import AllResorters from "../components/AdminPages/AllStaff";
import AllUsers from "../components/AdminPages/AllUser";
import Error from "../components/Error/Admin";

import AllAdventure from "../components/AdminPages/AllAdventure";
import AllDestination from "../components/AdminPages/AllDestination";
import ViewAdventure from "../components/AdminPages/ViewAdventure";
import ViewDestination from "../components/AdminPages/ViewDestination";

import AllBookings from "../components/AdminPages/AllBookings";

const AdminRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/adLogin" element={<AdminLogin />} />
        <Route
          element={<PrivateRoute role={"admin"} route={"/admin/adLogin"} />}
        >
          <Route path="adminHome" element={<Adminhome />} />
          <Route path="adminAllResort" element={<ResortList />} />
          <Route path="pendingRequest" element={<PendingRequest />} />
          <Route path="viewResort/:id" element={<ViewResort />} />
          <Route path="/adminAdventure" element={<AllAdventure />} />
          <Route path="/viewActivity/:id" element={<ViewAdventure />} />
          <Route path="/adminDestination" element={<AllDestination />} />
          <Route path="allStaff" element={<AllResorters />} />
          <Route path="allUser" element={<AllUsers />} />
          <Route path="/viewDestination/:id" element={<ViewDestination />} />
          <Route path="/allBookings" element={<AllBookings />} />
        </Route>
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
};

export default AdminRoute;
