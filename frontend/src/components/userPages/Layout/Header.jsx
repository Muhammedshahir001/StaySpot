import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { TbHome2 } from "react-icons/tb";
import { LuHotel } from "react-icons/lu";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import { DiYii } from "react-icons/di";
import { setUserDetails } from "../../../redux/userSlice";

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState(null);


  const handleLogout = () => {
    localStorage.removeItem("usertoken");
    dispatch(
      setUserDetails({
        name: null,
        _id: null,
        email: null,
        phone: null,
      })
    );
    setToken(null);
    localStorage.removeItem("user");
    // localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

    useEffect(() => {
      const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
      const isLoggedIn = localStorage.getItem("isLoggedIn");

      if (isLoggedIn && userFromLocalStorage) {
        dispatch(setUserDetails(userFromLocalStorage));
      }
    }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setToken(token);
    }
  }, []); // Run this effect only once on component mount

  return (
    <div
      className="navbar bg-slate-900 flex justify-between "
      style={{ zIndex: 100, position: "relative" }}
    >
      <div>
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-sky-500 rounded-none w-52 text-white"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li tabIndex={0}>
              <Link to="/resortList">Resort</Link>
            </li>
            <li>
              <Link to="/adventure">Adventure</Link>
            </li>
            <li>
              <Link to="/destinations">Destinations</Link>
            </li>
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost normal-case text-3xl text-white">
          <DiYii color="#4338ca" className="logo h-18 w-15" />
          StaySpot
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white text-xl ">
          <li>
            <Link
              className="hover:text-blue-300 hover:animate-pulse hover:font-semibold "
              to="/"
            >
              {" "}
              <TbHome2 />
              Home
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-blue-300 hover:animate-pulse hover:font-semibold"
              to="/resortList"
            >
              {" "}
              <LuHotel />
              Resort
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-blue-300 hover:animate-pulse hover:font-semibold"
              to="/adventure"
            >
              {" "}
              <FaPersonWalkingLuggage />
              Adventure
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-blue-300 hover:animate-pulse hover:font-semibold"
              to="/destinations"
            >
              {" "}
              <FaMapMarkerAlt />
              Destinations
            </Link>
          </li>
        </ul>
      </div>
      <div className="float-right gap-2">
        {" "}
        {token ? (
          <div className="float-left gap-2 ">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="flex justify-center items-center">
                  <FaUser className="text-white text-xl" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-cyan-600 rounded-box w-52 text-white"
              >
                <li>
                  <Link to="/profile">
                    <a className="justify-between">
                      {user.name ? user.name : "Profile"}
                    </a>
                  </Link>
                </li>

                <li>
                  <Link to="/MyBookings">
                    <a>Booking History</a>
                  </Link>
                </li>

                <li>
                  <a onClick={() => handleLogout()}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
