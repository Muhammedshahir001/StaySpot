import React from "react";
import { Link } from "react-router-dom";
import {  get_Booked_Data} from "../../api/userApi";

const Hotelpaying = () => {


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8">
        <img
          src="https://res.cloudinary.com/dqlhedl48/image/upload/v1697470170/samples/jhen9ppt7ntkb7pgdvmc.gif"
          className="w-96 h-64"
          alt="img"
        />
        <h2 className="text-2xl font-bold mb-4">
          Your Resort is successfully reserved
        </h2>
        <Link to="/resortlist" className="btn btn-info mr-4">
          HomePage
        </Link>
        {/* <button className='btn btn-warning'>Download Pdf </button> */}
        <Link to="/Mybookings" className="btn btn-success">
          View Booking
        </Link>
      </div>
    </div>
  );
};

export default Hotelpaying;
