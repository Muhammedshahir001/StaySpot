import React from "react";
import { useSelector } from "react-redux";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { Link } from "react-router-dom";
import ChangePassword from "./ChangePassword";

const Profile = () => {
  const users = useSelector((state) => state.user);
  console.log(users, "jiijijjj");
  return (
    <div className="mx-auto max-w-screen-2xl">
      <Header />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="bg-slate-200 rounded-lg shadow-md p-8 w-full md:w-96">
          <h1 className="font-bold text-2xl mb-4">My Account Details</h1>
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-blue-700 ring-offset-base-100 ring-offset-2">
              <img src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg" />
            </div>
          </div>

          <h2 className="text-lg mt-4 mb-2">Name:</h2>
          <input type="text" value={users.name} className="input mb-4" />

          <h2 className="text-lg mt-4 mb-2 w-44">Phone:</h2>
          <input
            type="text"
            value={users.phone ? users.phone : "No phone number in your email"}
            className="input mb-4"
          />

          <h2 className="text-lg mt-4 mb-2">Email:</h2>
          <input type="email" value={users.email} className="input mb-4" />

          <div className=" text-center flex justify-center items-center">
            <label
              htmlFor="chngepass"
              className="cursor-pointer font-bold underline underline-offset-4"
            >
              Change Password
            </label>
          </div>
        </div>
      </div>
      <ChangePassword />
      <Footer />
    </div>
  );
};

export default Profile;
