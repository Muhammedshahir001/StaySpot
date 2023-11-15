import React,{useState} from "react";
import { Link } from "react-router-dom";
import { DiYii } from "react-icons/di";
import {
  MdHomeWork,
  MdDashboard,
  MdBookmarkAdded,
  MdDataThresholding,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbars = () => {
  const admin = useSelector((state) => state.admin);
    const [activeButton, setActiveButton] = useState("");

    const handleButtonClick = (buttonName) => {
      setActiveButton(buttonName);
    };
  console.log(admin, "admin"); // Log the admin object for debugging



  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-emerald-200	 text-teal-900 min-h-screen">
        {/* Logo */}
        <div className="p-6 flex items-center">
          <DiYii color="#059669" className="logo text-3xl h-18 w-15 mr-2" />
          <h1 className="text-3xl font-bold">Admin</h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-4">
          <Link
            to="/admin/adminHome"
            onClick={() => handleButtonClick("Dashboard")}
            className={`py-2 px-4 ${
              activeButton === "Dashboard"
                ? "text-white bg-gray-700"
                : "text-black hover:text-white hover:bg-gray-700"
            }`}
          >
            <span className="inline-block">
              <MdDashboard />
            </span>{" "}
            Dashboard
          </Link>
          <Link
            to="/admin/allUser"
            onClick={() => handleButtonClick("User Management")}
            className={`py-2 px-4 ${
              activeButton === "User Management"
                ? "text-white bg-gray-700"
                : "text-black hover:text-white hover:bg-gray-700"
            }`}
          >
            <span className="inline-block">
              <FaUsers />
            </span>
            User Management
          </Link>

          <Link
            to="/admin/pendingRequest"
            onClick={() => handleButtonClick("Resorts Management")}
            className={`py-2 px-4 ${
              activeButton === "Resorts Management"
                ? "text-white bg-gray-700"
                : "text-black hover:text-white hover:bg-gray-700"
            }`}
          >
            <span className="inline-block">
              <MdHomeWork />
            </span>
            Resorts Management
          </Link>

          <Link
            to="/admin/allStaff"
            onClick={() => handleButtonClick(" Staff Management")}
            className={`py-2 px-4 ${
              activeButton === " Staff Management"
                ? "text-white bg-gray-700"
                : "text-black hover:text-white hover:bg-gray-700"
            }`}
          >
            <span className="inline-block">
              <FaUsers />
            </span>{" "}
            Staff Management
          </Link>

          <Link
            to="/admin/adminDestination"
            onClick={() => handleButtonClick("DestinationManagement")}
            className={`py-2 px-4 ${
              activeButton === " DestinationManagement"
                ? "text-white bg-gray-700"
                : "text-black hover:text-white hover:bg-gray-700"
            }`}
          >
            <span className="inline-block">
              <MdDataThresholding />
            </span>
            DestinationManagement
          </Link>

          <Link
            to="/admin/adminAdventure"
            onClick={() => handleButtonClick("Adventure Management")}
            className={`py-2 px-4 ${
              activeButton === "Adventure Management"
                ? "text-white bg-gray-700"
                : "text-black hover:text-white hover:bg-gray-700"
            }`}
          >
            <span className="inline-block">
              <MdDataThresholding />
            </span>
            Adventure Management
          </Link>

          <Link
            to="/admin/allBookings"
            onClick={() => handleButtonClick(" Booking")}
            className={`py-2 px-4 ${
              activeButton === "  Booking"
                ? "text-white bg-gray-700"
                : "text-black hover:text-white hover:bg-gray-700"
            }`}
          >
            <span className="inline-block">
              <MdBookmarkAdded />
            </span>{" "}
            Booking
          </Link>

          {admin && admin.value && admin.value.email && (
            <>
              <div className="dropdown dropdown-hover">
                <label tabIndex={0} className="py-2 px-4">
                  <span className="hover:text-white-300">
                    {admin.value.email}
                  </span>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu shadow w-22 bg-slate-900"
                ></ul>
              </div>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbars;
