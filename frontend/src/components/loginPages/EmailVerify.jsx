import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { userverify } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/userSlice";

const EmailVerify = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // I getting the id by using useParams()
        const response = await userverify(id);
        const { success, error } = response.data;
        
       

        if (success) {
          // User verified successfully

               dispatch(
                 setUserDetails({
                   name: response.result.name,
                   _id: response.result._id,
                   email: response.result.email,
                   phone: response.result.phone,
                 })
               );
               // Save to local storage
               localStorage.setItem("user", JSON.stringify(response.result)); // Save user details
               localStorage.setItem("isLoggedIn", true);

               localStorage.setItem("token", response.result.token);
               navigate("/");
          navigate("/login");
        } else {
          // Error occurred during verification
          console.log(error, "error in verifying");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, [id, navigate]);

  return (
    <div>
      {isLoading ? (
        <h1>Verifying Email...</h1>
      ) : (
        <div>
          <h1>Email Verified!</h1>
          <p>Your email has been successfully verified.</p>
          <p>
            You can now proceed to the <Link to="/login">Login</Link> page.
          </p>
        </div>
      )}
    </div>
  );
};

export default EmailVerify;
