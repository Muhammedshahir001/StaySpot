import React, { useEffect, useState } from "react";
// import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setStaffDetails } from "../../redux/staffSlice";
import { stafflogin } from "../../api/Staffapi";

const StaffLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [staffemail, setstaffemail] = useState("");
  const [staffpass, setstaffpass] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("stafftoken");
    if (token) {
      navigate("/staff/staffhome");
    }
  }, [navigate]);

  const generateError = (err) => {
    toast.error(err, {
      position: "top-center",
    });
  };

  const handleSubmit = async (e) => {
    // console.log("in")
    e.preventDefault();

    if (!staffemail) {
      generateError("email is required");
      return;
    }
    if (!staffpass) {
      generateError("password is required");
      return;
    }
    try {
      const data = await stafflogin({
        email: staffemail,
        password: staffpass,
      });
      console.log(data, "login staff data...");
      if (data) {
        console.log("in", data.data);
        if (data.data.errors) {
          const { email, password, message } = data.data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
          else if (message) generateError(message);
        } else {
          dispatch(
            setStaffDetails({
              name: data.data.staff.name,
              id: data.data.staff._id,
              email: data.data.staff.email,
              phone: data.data.staff.phone,
              token: data.data.staff.token,
            })
          );

          if (data.data.staff.verified) {
            console.log("stafffff");

            localStorage.setItem("stafftoken", data.data.token);
            navigate("/staff/staffhome");
          } else {
            navigate("/staff/stafflogin");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage:
          "url('https://wallpapers.com/images/hd/nature-background-vwpswnh3w9kq330h.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        className="w-full max-w-md bg-white-200 rounded-lg shadow-md p-8 ml-9 bg-white"
        style={{ opacity: 0.9 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Resort Owner Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-black text-sm font-bold mb-2"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              onChange={(e) => setstaffemail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-black text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              onChange={(e) => setstaffpass(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            Login
          </button>
        </form>
        <p className=" font-bold text-black mt-4">
          Not registered?{" "}
          <Link to="/staff/staffregister" className="text-black">
            Signup here
          </Link>
        </p>
        <p className="font-bold text-black mt-4">
          User Login?{" "}
          <Link className="text-blue-800" to="/login">
            Login
          </Link>
        </p>

        <ToastContainer />
      </div>
    </div>
  );
};

export default StaffLogin;
