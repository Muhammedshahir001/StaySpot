import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { userregister, userRegisterGoogle } from "../../api/userApi";
import Spinner from "./Spinner";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserDetails } from "../../redux/userSlice";

const UserRegister = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState([]);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [repassword, setrepassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const googleRegister = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: () => toast.error("Goole login failed"),
  });

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

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


    useEffect(() => {
      const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
      const isLoggedIn = localStorage.getItem("isLoggedIn");

      if (isLoggedIn && userFromLocalStorage) {
        dispatch(setUserDetails(userFromLocalStorage));
      }
    }, [dispatch]);
  const users = useSelector((state) => state.user.id);
  useEffect(() => {
    if (users) {
      navigate("/");
    }
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res, "respodaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
          userRegisterGoogle(res.data).then((result) => {
            console.log(
              result,
              "======================================================"
            );

            if (result.data.created) {
              dispatch(
                setUserDetails({
                  name: result.data.user.name,
                  _id: result.data.user._id,
                  email: result.data.user.email,
                  phone: result.data.user.phone,
                })
              );
              // Save to local storage
              localStorage.setItem("user", JSON.stringify(result.data.user)); // Save user details
              localStorage.setItem("isLoggedIn", true);

              localStorage.setItem("usertoken", result.data.token);
              navigate("/");
            } else {
              toast.error(result.data.message);
            }
          });
        })
        .catch((err) => console.log(err));
    }
  }, [user, dispatch, navigate]);
  const handlePhoneInputChange = (e) => {
    // Ensure that only numeric characters are allowed
    const inputValue = e.target.value.replace(/[^0-9]/g, "");
    setphone(inputValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    startLoading();
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    const phoneRegex = /^\d{10}$/;

    if (name === "" || email === "" || phone === "" || password === "") {
      generateError("Please fill all the required fields");
    } else if (!strongPasswordRegex.test(password)) {
      generateError("Please enter a strong password");
    } else if (password !== repassword) {
      generateError("Passwords do not match. Please try again.");
    } else if (!phoneRegex.test(phone)) {
      generateError("Please enter a 10-digit phone number.");
    } else {
      try {
        const data = await userregister({
          name: name,
          email: email,
          phone: phone,
          password: password,
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
          generateSuccess(
            "Your verification Link sented , check your email now!!"
          );
        }
      } catch (error) {
        console.log("Error during registration:", error);
        generateError(
          "Sorry the email or password is already taken please provide another one !!!"
        );
      } finally {
        stopLoading(); // Stop the loading spinner
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
            'url("https://res.cloudinary.com/dqlhedl48/image/upload/v1699816930/banner/sidhqk0xdb2d8mfmdgl9.jpg")',
        }}
      >
        <div
          style={{ margin: "2vw 13vw" }}
          className="absolute flex flex-col md:w-3/4 py-12 md:flex-row items-center  bg-slate-50 bg-opacity-80 rounded-3xl"
        >
          <div className=" w-1/2 pl-24 rounded-lg">
            <h1 className="text-2xl font-bold text-blue-800 mb-7">SignUp</h1>
            <p>Please Enter Your SignUp Details</p>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <input
                className="h-10 max-w-sm text-blue-700 mt-1 bg-transparent border-[3px] border-blue-900 rounded-sm pl-5"
                type="text"
                name="firstname"
                placeholder="First Name"
                onChange={(e) => setname(e.target.value)}
              />
              <input
                className="h-10 max-w-sm  text-blue-700 mt-1 bg-transparent border-[3px] border-blue-900 rounded-sm pl-5"
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setemail(e.target.value)}
              />
              <input
                className="h-10 max-w-sm  text-blue-700 mt-1 bg-transparent border-[3px] border-blue-900 rounded-sm pl-5"
                type="text"
                name="phone_number"
                value={phone}
                placeholder="Phone"
                onChange={handlePhoneInputChange}
              />
              <input
                className="h-10 max-w-sm  text-blue-700 mt-1 bg-transparent border-[3px] border-blue-900 rounded-sm pl-5"
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setpassword(e.target.value)}
              />
              <input
                className="h-10 max-w-sm  text-blue-700 mt-1 bg-transparent border-[3px] border-blue-900 rounded-sm pl-5"
                type="password"
                name="password2"
                placeholder="Confirm Password"
                onChange={(e) => setrepassword(e.target.value)}
              />
              <button
                className="h-10 max-w-sm mt-8 text-blue-950 font-extrabold text-lg border-[3px] border-blue-900 rounded-sm hover:text-white relative flex items-center justify-center"
                type="submit"
                disabled={isLoading}
              >
                {isLoading && <Spinner className="w-5 h-5 mr-2" />}{" "}
                {/* Display spinner if loading */}
                {!isLoading ? "SIGNUP" : "Signing up..."}
              </button>

              <span className="flex items-center justify-center pr-28 ">
                OR
              </span>
              <div class="px-6 sm:px-0 max-w-sm">
                <button
                  type="button"
                  onClick={googleRegister}
                  // onDoubleClick={signInWithGoogle}
                  class="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                >
                  <svg
                    class="mr-2 -ml-1 w-4 h-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                  Sign up with Google<div></div>
                </button>
              </div>

              <div className="flex ">
                <p className=" me-4">Already a member..?</p>
                <p className="">
                  <Link className="text-blue-800" to="/login">
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
                src={
                  "https://res.cloudinary.com/dqlhedl48/image/upload/v1699419199/oqpmqhvxuzz3jvzw2s2x.png"
                }
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
