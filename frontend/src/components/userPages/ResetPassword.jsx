import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { resetPassword } from "../../api/userApi";
import { useEmail } from "./EmailContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordReset, setPasswordReset] = useState(false);
  const { email } = useEmail();

  const [passwordError, setPasswordError] = useState("");

  const isPasswordValid = (password) => {
    // Strong password criteria: At least 8 characters, one uppercase, one lowercase, one digit, and one special character
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    return strongPasswordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    } else {
      setPasswordError("Passowrd is Match");
    }

    if (!isPasswordValid(password)) {
      setPasswordError("Password is not strong enough");
      return;
    } else {
      setPasswordError("Password is Strong");
    }

    try {
      await resetPassword({ token, password, email });
      setPasswordReset(true);
      toast.success("Password reset successfully");
    } catch (error) {
      console.log(error, "Error occurred in the reset password page....");
      toast.error("An error occurred while resetting the password");
    }
  };

  return (
    <div className="flex flex-wrap h-screen">
      <div
        className="w-full sm:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://visme.co/blog/wp-content/uploads/2020/02/header-1200.gif')",
        }}
      ></div>

      <div
        className="w-full sm:w-1/2 flex justify-center items-center  "
        style={{
          backgroundImage:
            "url('https://www.coreldraw.com/static/cdgs/images/pages/seo/tips/photo/basics/blur-background/blur-background-og.jpg')",
        }}
      >
        <div
          className="w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-md p-8"
          style={{ opacity: 0.9 }}
        >
          <h2 className="text-2xl mb-4">Reset Password</h2>
          {passwordReset ? (
            <div>
              <p>Your password has been reset successfully.</p>
              <Link to="/login" className="text-blue-500 hover:underline">
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  New Password:
                </label>
                <div className="relative">
                  <input
                    className="h-10 w-full text-blue-700 mt-1 bg-transparent border-[3px] border-blue-900 rounded-sm pl-5"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm Password:
                </label>
                <div className="relative">
                  <input
                    className="h-10 w-full text-blue-700 mt-1 bg-transparent border-[3px] border-blue-900 rounded-sm pl-5"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              {passwordError && (
                <div className="text-red-500 mb-2">{passwordError}</div>
              )}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Reset Password
              </button>
              <div className="flex pt-6">
                <p className=" me-4">Already a member..?</p>
                <p className="">
                  <Link className="text-blue-800" to="/login">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
