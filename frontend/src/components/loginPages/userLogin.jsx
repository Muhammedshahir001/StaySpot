import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/userSlice";
import { userlogin } from "../../api/userApi";
// import {signInWithGoogle} from "./Firebase"
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const UserLogin = () => {
  const users = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [useremail, setuseremail] = useState("");
  const [userpass, setuserpass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: () => toast.error("Goole login failed"),
  });

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn && userFromLocalStorage) {
      dispatch(setUserDetails(userFromLocalStorage));
    }
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      navigate("/");
    }
  });

  const generateError = (err) => {
    toast.error(err, {
      position: "top-center",
    });
  };

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
          console.log();
          console.log();

          console.log(res, "*****************");

          console.log();
          console.log();

          userlogin({ email: res.data.email, password: res.data.id }).then(
            (result) => {
              console.log(result);
              if (result.data.created) {
                console.log(result);
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
            }
          );
        })
        .catch((err) => console.log(err));
    }
  }, [user, dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await userlogin({
        email: useremail,
        password: userpass,
      });
      console.log(data, "data of user...");

      if (data) {
        if (data.data.errors) {
          const { email, password } = data.data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          const user = data.data.user;
          if (user.status === "Block") {
            toast.error("Your account is blocked!!.", {
              position: "top-center",
            });
          } else {
            dispatch(
              setUserDetails({
                name: data.data.user.name,
                _id: data.data.user._id,
                email: data.data.user.email,
                phone: data.data.user.phone,
              })
            );

            // Save to local storage
            localStorage.setItem("user", JSON.stringify(data.data.user)); // Save user details
            localStorage.setItem("isLoggedIn", true);

            if (data.data.user.verifiyd) {
              localStorage.setItem("usertoken", data.data.token);
              console.log(data.data.message, "toast working..");
              toast.success(data.data.message, {
                position: "top-center",
              });
              navigate("/");
            } else {
              navigate("/login");
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dqlhedl48/image/upload/v1700020776/pqwfhuclt99kwkqf1mqr.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        className="w-full max-w-md bg-white-200 rounded-lg shadow-md p-8 bg-white"
        style={{ opacity: 0.9 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          User Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-black text-sm font-bold mb-2"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              onChange={(e) => setuseremail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-black text-sm font-bold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                onChange={(e) => setuserpass(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-0 top-0 mt-3 mr-4 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 12l2-2m0 0a4 4 0 1 1 6 0m-6 0a4 4 0 1 0 6 0M14 12l2-2m0 0a4 4 0 1 1 6 0m-6 0a4 4 0 1 0 6 0"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21a3 3 0 01-3-3V9a5 5 0 0110 0v9a3 3 0 01-3 3z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white w-full font-bold py-2 px-4 rounded  hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              Login
            </button>
          </div>
          <span className="flex justify-center">OR</span>
          <div class="px-6 sm:px-0 max-w-sm">
            <button
              type="button"
              onClick={login}
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
              Continue with Google<div></div>
            </button>
          </div>
        </form>
        <p className=" font-bold text-black mt-4">
          Not registered?{" "}
          <Link to="/register" className="text-black font-bold">
            Signup here
          </Link>
        </p>
        <p className=" font-bold text-black mt-4">
          Staff Login?
          <Link to="/staff/stafflogin" className="text-black font-bold">
            {" "}
            SignIn
          </Link>
        </p>

        <p className="font-bold text-black mt-4">
          <Link to="/forgot-password" className="text-blue-500 font-bold">
            Forgot Password?
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserLogin;
