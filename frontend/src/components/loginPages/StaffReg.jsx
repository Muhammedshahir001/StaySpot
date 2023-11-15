import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { staffregister } from "../../api/Staffapi";

const StaffReg = () => {
  const [message, setMessage] = useState("");

  const [staffname, setstaffname] = useState("");
  const [staffemail, setstaffemail] = useState("");
  const [staffphone, setstaffphone] = useState("");
  const [staffpassword, setstaffpassword] = useState("");
  const [staffrepassword, staffsetrepassword] = useState("");
  const generateError = (err) => {
    toast.error(err, {
      position: "top-center",
    });
  };

  const generateSuccess = (message) => {
    toast.success(message, {
      position: "top-center",
    });
  };
    const handlePhoneInputChange = (e) => {
      // Ensure that only numeric characters are allowed
      const inputValue = e.target.value.replace(/[^0-9]/g, "");
      setstaffphone(inputValue);
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    const phoneRegex = /^\d{10}$/;

    if (
      staffname === "" ||
      staffemail === "" ||
      staffphone === "" ||
      staffpassword === ""
    ) {
      generateError("Please fill all the required fields");
    } else if (!strongPasswordRegex.test(staffpassword)) {
      generateError("Please enter a strong password");
    } else if (staffpassword !== staffrepassword) {
      generateError("Passwords do not match. Please try again.");
    } else if (!phoneRegex.test(staffphone)) {
      generateError("Please enter a 10-digit phone number.");
    } else {
      try {
        const data = await staffregister({
          name: staffname,
          email: staffemail,
          phone: staffphone,
          password: staffpassword,
        });

        if (data && data.errors) {
          if (data.errors.email) {
            generateError(
              "Email is already taken. Please use a different email."
            );
          }
          if (data.errors.phone) {
            generateError(
              "Phone number is already taken. Please use a different phone number."
            );
          }
        } else {
          generateSuccess("Account activated, check your email");
        }
      } catch (error) {
        console.log("Error during registration:", error);
        generateError(
          "Sorry the email or password is already taken please provide another one !!!"
        );
      }
    }
  };

  return (
    <div className="h-screen flex">
      <ToastContainer position="top-center" reverseOrder={false} />
      <div
        className="w-full bg-cover bg-center items-center"
        style={{
          backgroundImage:
            'url("https://res.cloudinary.com/dqlhedl48/image/upload/v1699817055/upxv3n9iffeygjyrp4kz.jpg")',
        }}
      >
        <div
          style={{ margin: "5vw 13vw" }}
          className="absolute flex flex-col md:w-3/4 py-12 md:flex-row items-center  bg-white bg-opacity-80 rounded-3xl"
        >
          <div className=" w-1/2 pl-24 rounded-lg">
            <h1 className="text-2xl font-bold text-blue-800 mb-7">
              {" "}
              Resort Owner SignUp
            </h1>
            <p>Resort Owner Details</p>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <input
                className="h-10 max-w-sm text-blue-700 mt-1 bg-transparent border-[3px] border-blue-900 rounded-sm pl-5"
                type="text"
                name="firstname"
                placeholder="First Name"
                onChange={(e) => setstaffname(e.target.value)}
              />
              <input
                className="h-10 max-w-sm  text-blue-700 mt-1 bg-transparent border-[3px] border-blue-900 rounded-sm pl-5"
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setstaffemail(e.target.value)}
              />
              <input
                className="h-10 max-w-sm  text-blue-700 mt-1 bg-transparent border-[3px] border-blue-900 rounded-sm pl-5"
                type="text"
                name="phone_number"
                value={staffphone}
                placeholder="Phone"
                onChange={handlePhoneInputChange}
              />
              <input
                className="h-10 max-w-sm  text-blue-700 mt-1 bg-transparent border-[3px] border-blue-900 rounded-sm pl-5"
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setstaffpassword(e.target.value)}
              />
              <input
                className="h-10 max-w-sm  text-blue-700 mt-1 bg-transparent border-[3px] border-blue-900 rounded-sm pl-5"
                type="password"
                name="password2"
                placeholder="Confirm Password"
                onChange={(e) => staffsetrepassword(e.target.value)}
              />
              <button
                className="h-10 max-w-sm mt-8 text-blue-950 font-extrabold text-lg border-[3px] border-blue-900 rounded-sm hover:text-white"
                type="submit"
              >
                SIGNUP
              </button>
              <div className="flex ">
                <p className=" me-4">Already a member..?</p>
                <p className="">
                  <Link className="text-blue-800" to="/staff/stafflogin">
                    Login
                  </Link>
                </p>
              </div>
              {message && <p className="text-green-500 mt-4">{message}</p>}
            </form>
          </div>
          <div className=" w-1/2 register-image-full-container">
            <div className="travel-img-container">
              <img
                className="rounded-lg  md:ml-5  w-2/3"
                src={"https://media.tenor.com/CeDk6XdCgOUAAAAi/develop-web.gif"}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffReg;
