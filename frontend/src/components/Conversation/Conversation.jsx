import React, { useEffect, useState } from "react";
import { getUser } from "../../api/userApi";
const Conversate = ({ data, currentUserId, online }) => {
  // userData means the reciever or whom the user is chatting with.
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);
    
    // console.log(userId, "iiiddd");
    // console.log(online, "yyyy");
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data.result);
        console.log(data.result, "9999999999");
      } catch (error) {
        console.log(error,"Error occured in the Coversation page ");
      }
    };
    getUserData();
  }, []);
  return (
    <>
      <div className="follower conversation">
        <div>
          {userData?.map((staffdata, index) => {
            return (
              <div
                className="follower conversation flex items-center"
                key={index}
              >
                <div className="text-lg w-full">
                  <span>{staffdata?.name}</span>
                  <span className="float-right mr-2">
                    {online ? "online" : "offline"}
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

export default Conversate;
