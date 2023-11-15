import React from "react";
import { Link } from "react-router-dom";
import { DiYii } from "react-icons/di";
import {
  MdHomeWork,
  MdDashboard,
  MdDataThresholding,
  MdLogout,
  MdBookmarkAdded,
} from "react-icons/md";
import { useSelector } from "react-redux";

const Navbar = () => {
  const staffs = useSelector((state) => state.staff);
  console.log(staffs, "checking blocking or not..,");
  const handleLogout = () => {
    localStorage.removeItem("stafftoken");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white  min-h-screen">
        {/* Logo */}
        <div className="p-6 flex items-center">
          <DiYii color="#059669" className="logo text-3xl h-18 w-15 mr-2" />
          <h1 className="text-3xl font-bold">Staff</h1>
        </div>
        {/* Navigation */}
        <nav className="flex flex-col p-4">
          <Link
            to="/staff/staffHome"
            className="py-2 px-4 text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <span className="inline-block">
              <MdDashboard />
            </span>
            Dashboard
          </Link>
          <Link
            to="/staff/staffResorts"
            className="py-2 px-4 text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <span className="inline-block">
              <MdHomeWork />
            </span>{" "}
            Resort
          </Link>

          <Link
            to="/staff/staffDestination"
            className="py-2 px-4 text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <span className="inline-block">
              <MdDataThresholding />
            </span>{" "}
            Destination
          </Link>

          <Link
            to="/staff/staffAdventure"
            className="py-2 px-4 text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <span className="inline-block">
              <MdDataThresholding />
            </span>{" "}
            Adventure
          </Link>

          <Link
            to="/staff/roomBookings"
            className="py-2 px-4 text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <span className="inline-block">
              <MdBookmarkAdded />
            </span>{" "}
            Bookings
          </Link>

          {/* Show the name and logout button */}
          <div className="dropdown dropdown-hover">
            <label tabIndex={0} className="py-2 px-4">
              <span className="hover:text-white-300">
                {staffs && staffs.name ? staffs.name : "Guest"}
              </span>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu shadow w-22 bg-slate-900"
            >
              <Link to="/staff/staffLogin">
                <a
                  onClick={handleLogout}
                  className="py-2 px-4 text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  <span className="inline-block">
                    <MdLogout />
                  </span>
                  Logout
                </a>
              </Link>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
