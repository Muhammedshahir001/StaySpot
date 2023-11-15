import React, { useEffect, useState } from "react";
import { getStaff} from "../../api/Staffapi";
const StaffConversate = ({ data, currentStaffId, stafonline }) => {
  const [staffData, setStaffData] = useState(null);

  useEffect(() => {
    const staffId = data.members.find((id) => id !== currentStaffId);
    // console.log(staffId, "staff Id in chat");
    const getUserschats = async () => {
      try {
        const { data } = await getStaff(staffId);
        setStaffData(data.result);
        // console.log(data.result,"Data Result");
      } catch (error) {
        console.error("Error fetching staff data:", error);
        // Handle the error, e.g., display an error message to the user
      }
    };
    getUserschats();
  }, [currentStaffId, data.members]);
  return (
    <>
      <div className="follower conversation">
        <div>
          {staffData?.map((staffdata, index) => {
            return (
              <div
                className="follower conversation flex items-center"
                key={index}
              >
                <div className="text-lg w-full">
                  <span>{staffdata?.name}</span>
                  <span className="float-right mr-2">
                    {stafonline ? "online" : "offline"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <hr className="my-4 border-gray-300" />
    </>
  );
};

export default StaffConversate;
