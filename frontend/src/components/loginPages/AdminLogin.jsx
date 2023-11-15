import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setAdminDetails } from "../../redux/adminSlice";
import { adminlogin } from "../../api/adminApi";

const AdminLogin = () => {
  const admins = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });
  const generateError = (err) => {
    toast.error(err, {
      position: "top-center",
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    if (token) {
      navigate("/admin/adminhome");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    console.log("in");
    e.preventDefault();

    try {
      const data = await adminlogin({ ...admin });
      console.log("ikjhgfn", data);
      if (data.data) {
        console.log("in", data);
        if (data.data.errors) {
          const { email, password } = data.data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          dispatch(
            setAdminDetails({
              email: data.data.admin.email,
              token: data.data.token,
            })
          );
          localStorage.setItem("admintoken", data.data.token);
          navigate("/admin/adminhome");
        }
      }
    } catch (error) {
      console.log(error, "login error");
    }
    // Handle login logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              // value={email}
              onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              // value={password}
              onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4">
          Login As A staff ?
          <Link to="/staff/stafflogin" className="text-blue-500">
            {" "}
            SignIn
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
