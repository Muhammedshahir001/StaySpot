import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../api/userApi";
import { useEmail } from "./EmailContext";

const ForgotPassword = () => {
  const { email, setEmail } = useEmail();
  const [resetEmailSent, setResetEmailSent] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setEmail(email);
      await forgotPassword(email);
      setResetEmailSent(true);
    } catch (error) {
      console.log(error, "Error occurred in the forgot password page....");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.travelapi.com/lodging/1000000/530000/527000/526946/bf5abca1_z.jpg')",
      }}
    >
      <div className="w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-md p-8">
        <h2 className="text-2xl mb-4">Forgot Password</h2>
        {resetEmailSent ? (
          <div>
            <p>An email with a reset link has been sent to your inbox.</p>
            <Link to="/login" className="text-blue-500 hover:underline">
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Send
            </button>
            <div className="flex ">
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
  );
};

export default ForgotPassword;
