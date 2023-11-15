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
    <>
      <Header />
      <div className="mx-auto max-w-screen-2xl">
        <div className="min-h-screen bg-white flex flex-col items-center justify-center">
          <div className="bg-white rounded-lg shadow-2xl p-8  w-full flex items-center justify-center ">
            <div className=" w-96 ">
              <h1 className="font-bold text-2xl mb-4 flex justify-center">
                My Account Details
              </h1>
              <div className="avatar flex justify-center">
                <div className="w-24 rounded-full ring ring-blue-700 ring-offset-base-100 ring-offset-2">
                  <img src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg" />
                </div>
              </div>

              <h2 className="text-lg mt-4 mb-2">Name:</h2>
              <input
                type="text"
                value={users.name}
                className="input mb-4 w-full border-b-black bg-gray-100"
              />

              <h2 className="text-lg mt-4 mb-2 w-44">Phone:</h2>
              <input
                type="text"
                value={
                  users.phone ? users.phone : "No phone number in your email"
                }
                className="input mb-4 w-full border-b-black bg-gray-100"
              />

              <h2 className="text-lg mt-4 mb-2">Email:</h2>
              <input
                type="email"
                value={users.email}
                className="input mb-4 w-full border-b-black bg-gray-100"
              />

              <div className=" text-center flex justify-center items-center">
                <label
                  htmlFor="chngepass"
                  className="cursor-pointer font-bold underline underline-offset-4 "
                >
                  Change Password
                </label>
              </div>
            </div>
          </div>
        </div>
        <ChangePassword />
      </div>
      <Footer />
    </>
  );
};

export default Profile;
