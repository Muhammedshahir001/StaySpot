import React from "react";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
const Headers = ({ name }) => {
  const handleLogout = () => {
    localStorage.removeItem("admintoken");

    console.log("Logout button clicked");
  };

  return (
    <div className="flex-1">
      <header className="bg-emerald-200	 p-4 shadow-md flex justify-between items-center">
        <h2 className="text-2xl font-medium">{name}</h2>
        <Link to="/admin/adLogin">
          <a
            href="/logout" // Add the href attribute with the desired URL
            onClick={handleLogout}
            className="py-2 px-4 text-gray-400 hover:text-white hover:bg-sky-600"
          >
            <span className="inline-block">
              <MdLogout />
            </span>
            Logout
          </a>
        </Link>
      </header>
    </div>
  );
};

export default Headers;
