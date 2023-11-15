import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { staffverify } from "../../api/Staffapi";

const EmailVerifystaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyStaff = async () => {
      console.log("verify staff working");
      try {
        console.log(id, "iiiiiiiii");
        // I getting the id by using useParams()
        // const response = await axios.post(`http://localhost:4001/staff/verifystaffemail/${id}`);
        const response = await staffverify(id);
        console.log(response, "after working ");
        // it response  getting onlt success and status true
        const { success, error } = response.data;

        if (success) {
          // User verified successfully
          navigate("/staff/stafflogin");
        } else {
          // Error occurred during verification
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    verifyStaff();
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
            You can now proceed to the <Link to="/staff/stafflogin">Login</Link>{" "}
            page.
          </p>
        </div>
      )}
    </div>
  );
};

export default EmailVerifystaff;
