import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "../pages/user/loginPage";
import RegisterPage from "../pages/user/signUpPage";
import UserHome from "../pages/user/userHome";
import EmailVerify from "../components/loginPages/EmailVerify";
import ResortList from "../components/userPages/Resort";
import ResortData from "../components/userPages/ResortData";
import Adventure from "../components/userPages/Adventure";
import AdventureData from "../components/userPages/adventureData";
import Destination from "../components/userPages/Destination";
import DestinationData from "../components/userPages/DestinationData";
import Profile from "../components/userPages/Profile";
import PrivateRoute from "../productRoute/PrivateRoute";
import Booking from "../components/userPages/Booking";
import ResortPaying from "../components/userPages/ResortPaying";
import ResortBooking from "../components/userPages/ResortBooking";
import ForgotPassword from "../components/userPages/ForgotPassword";
import ResetPassword from "../components/userPages/ResetPassword";
import Error from "../components/Error/User";
import Chat from "../pages/chat/Chat";

const UserRoute = () => {
  const user = useSelector((state) => state.user);
  console.log(user, "user fata");
  return (
    <>
      <Routes>
        <Route path="/*" element={<Error />} />
        <Route path="/" element={<UserHome />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verifyEmail/:id" element={<EmailVerify />} />
        <Route path="/resortList" element={<ResortList />} />
        <Route path="/viewData/:id" element={<ResortData />} />
        <Route path="/adventure" element={<Adventure />} />
        <Route path="/ViewAdventure/:id" element={<AdventureData />} />
        <Route path="/destinations" element={<Destination />} />
        <Route path="/ViewDestination/:id" element={<DestinationData />} />
        <Route path="/viewBook" element={<ResortBooking />} />
        <Route path="/hotelbooking" element={<ResortPaying />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />

        <Route element={<PrivateRoute role={"user"} route={"/login"} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />

          <Route path="/MyBookings" element={<Booking />} />
        </Route>
      </Routes>
    </>
  );
};

export default UserRoute;
