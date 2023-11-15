import React from "react";
import { SiGooglechat } from "react-icons/si";
import { useNavigate } from "react-router-dom";

// import { Link } from "react-router-dom";

const Headerr = ({ name }) => {
    const navigate = useNavigate();
    const handleGetchat = () => {
      console.log("navigate working...");
      navigate("/staff/chatWithUser");
    };

  return (
    <div className="flex-1">
      <header className="bg-white p-4 shadow-md flex justify-between items-center">
        <h2 className="text-2xl font-bold">{name}</h2>
        <div className="flex items-center">
          <SiGooglechat
            className="text-2xl text-info"
            onClick={() => {
              handleGetchat();
            }}
          ></SiGooglechat>
        </div>
      </header>
    </div>
  );
};

export default Headerr;
