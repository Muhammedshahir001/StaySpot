import React from "react";
import Navbars from "./layout/Navbar";
import Headers from "./layout/Header";

const ApprovedResort = () => {
  return (
    <div className="flex">
      <Navbars />
      <div className="flex-1">
        <Headers name={"List of approved Resorts"} />
      </div>
    </div>
  );
};

export default ApprovedResort;
