import React, { useEffect, useRef, useState } from "react";
import { getStaff, getstaffMessages, addMsg } from "../../api/Staffapi";

import InputEmoji from "react-input-emoji";
import { FiSend } from "react-icons/fi";

const StaffChatBox = ({
  chat,
  currentStaff,
  setStaffsendMessage,
  staffrecievedMessage,
}) => {
  const [staffData, setStaffData] = useState(null);
  const [stafmessages, setstafMessages] = useState([]);
  const [stafnewMessage, setStafNewMessage] = useState("");
  const scroll = useRef();
  const handleChange = (stafnewMessage) => {
    setStafNewMessage(stafnewMessage);
  };
  useEffect(() => {
    console.log(staffrecievedMessage)
    if (staffrecievedMessage) {
      setstafMessages([...stafmessages, staffrecievedMessage]);
    }
  }, [staffrecievedMessage]);
  useEffect(() => {
    const staffId = chat?.members?.find((id) => id !== currentStaff);

    // console.log(staffId, "iiiddd");
    const getUserData = async () => {
      const { data } = await getStaff(staffId);
      setStaffData(data.result);
      // console.log(data.result);
    };
    if (chat !== null) getUserData();
  }, [chat, currentStaff]);
  useEffect(() => {
    const fetchmessages = async () => {
      try {
        const { data } = await getstaffMessages(chat._id);
        // console.log(data);
        setstafMessages(data);
        // console.log(data)
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchmessages();
  }, [chat]);
  function convertTimestampToFormattedDateTime(timestamp) {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedDateTime = `${day}-${month} ${hours}:${minutes}:${seconds} ${ampm}`;

    return formattedDateTime;
  }

  const handleSend = async (e) => {
    e.preventDefault();
    const messag = {
      senderId: currentStaff,
      text: stafnewMessage,
      chatId: chat._id,
    };
    try {
      const { data } = await addMsg(messag);
      setstafMessages([...stafmessages, data]);
      setStafNewMessage("");
      const receiverId = chat.members.find((id) => id !== currentStaff);
      setStaffsendMessage({ ...data, receiverId });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {chat ? (
        <div className="chatBoxcontainer">
          <div>
            {staffData?.map((staffdata, index) => (
              <div
                className="follower conversation flex items-center"
                key={index}
              >
                <div className="text-lg w-full h-full font-bold text-white">
                  <span>{staffdata?.name}</span>
                </div>
              </div>
            ))}
          </div>
          <hr className="my-4 border-gray-300" />
          <div className="chatmsg">
            {stafmessages.map((message) => (
              <>
                {message.senderId === currentStaff ? (
                  <div ref={scroll} className="msg justify-end flex mb-2">
                    <div className="text-white p-3 rounded-lg bg-slate-400">
                      <span className="text-lg font-semibold p-2 ">
                        {message.text}
                      </span>
                      <span className="text-sm">
                        {message.createdAt &&
                          convertTimestampToFormattedDateTime(
                            message.createdAt
                          )}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div ref={scroll} className="msg justify-start flex mb-2">
                    <div className="msg-content bg-gray-200 p-3 rounded-lg">
                      <span className="text-lg font-semibold m-2">
                        {message.text}
                      </span>
                      <span className="text-sm">
                        {message.createdAt &&
                          convertTimestampToFormattedDateTime(
                            message.createdAt
                          )}
                      </span>
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
          <div>
            <div className="chat-sender flex items-center">
              <div>+</div>
              <InputEmoji
                value={stafnewMessage}
                onChange={handleChange}
                className="mr-2"
              />
              <button className="btn btn-success" onClick={handleSend}>
                <FiSend />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <span className="text-center">
            Tap on a chat to start conversation
          </span>
        </div>
      )}
    </>
  );
};

export default StaffChatBox;
